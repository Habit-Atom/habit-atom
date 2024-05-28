var content = document.getElementById("content")
var buttonContainer = document.getElementById("popup-signin-button")

function sendRequest(endpoint, type, options = {}) {
  chrome.storage.local.get(['jwtToken'], function(result) {
    const token = result.jwtToken;
    if (token) {
      options.headers = options.headers || {};
      options.headers['Authorization'] = 'Bearer ' + token;

      fetch(endpoint, options)
        .then(response => {
          if (!response.ok) {
            if (response.status === 401) {
              console.log("Token expired, trying to refresh token...");
              return refreshTokenAndRetry(endpoint, type, options);
            }
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          content.style.display = "block";
          buttonContainer.style.display = "none";

          if (type === "habit") {
            display(data, document.getElementById('habits-container'), type);
          } else if (type === "task") {
            display(data, document.getElementById('tasks-container'), type);
          } else {
            console.log("Unknown type");
          }
        })
        .catch(error => console.error('Error:', error));
    } else {
        content.style.display = "none";
        buttonContainer.style.display = "flex";
        buttonContainer.innerHTML = ''; 
        const link = document.createElement('a');
        link.href = 'http://localhost:3000/auth';
        link.textContent = 'Sign In';
        link.target = "_blank"
        buttonContainer.appendChild(link);
    }
  });
}

function refreshTokenAndRetry(endpoint, type, options = {}) {
  chrome.storage.local.get(['jwtToken'], function(result) {
    const token = result.jwtToken;
    if (token) {
      fetch('http://localhost:8080/api/v1/refreshToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        const newToken = data.token; // Assuming the new token is in the "token" field
        chrome.storage.local.set({ jwtToken: newToken }, function() {
          console.log('Token refreshed');
          // Retry the original request with the new token
          options.headers['Authorization'] = 'Bearer ' + newToken;
          return fetch(endpoint, options)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
              }
              return response.json();
            })
            .then(data => {
              if (type === "habit") {
                display(data, document.getElementById('habits-container'), type);
              } else if (type === "task") {
                display(data, document.getElementById('tasks-container'), type);
              } else {
                console.log("Unknown type");
              }
            });
        });
      })
      .catch(error => console.error('Error:', error));
    } else {
      console.error('No token found');
    }
  });
}

let allStyles = [];

function display(data, container, type) {
  container.innerHTML = '';

  if (data.length === 0) {
    if (type === 'habit') {
      container.innerHTML = '<p>No habits for today</p>';
    } else if (type === 'task') {
      container.innerHTML = '<p>No tasks for today</p>';
    }
    return;
  }

  const styles = data.map(d => createStyles(d, type)).join('');
  allStyles.push(styles);

  const html = data.map(d => createHtml(d, type)).join('');
  container.innerHTML = html;

  document.getElementById('dynamic-styles').innerHTML = allStyles.join('');

  // Attach event listeners to the checkboxes
  container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      const type = event.target.getAttribute('data-type');
      handleCheckboxClick(id, type);
    });
  });
}

function createStyles(data, type) {
  if (type === "habit") {
    const name = data.habit.name.toLowerCase().replace(/\s+/g, '_');
    return `
      .round input[type="checkbox"]:checked + label[for="checkbox-${name}"] {
        background-color: ${data.habit.color};
        border-color: ${data.habit.color};
      }
      .round label[for="checkbox-${name}"] {
        border: 3px solid ${data.habit.color};
      }
    `;
  } else if (type === "task") {
    const name = data.task.name.toLowerCase().replace(/\s+/g, '_');
    return `
      .round input[type="checkbox"]:checked + label[for="checkbox-${name}"] {
        background-color: ${data.task.color};
        border-color: ${data.task.color};
      }
      .round label[for="checkbox-${name}"] {
        border: 3px solid ${data.task.color};
      }
    `;
  }
}

function hexToRGBA(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function createHtml(data, type) {
  if (type === "habit") {
    const name = data.habit.name.toLowerCase().replace(/\s+/g, '_');
    return `
      <div class="habit">
        <div class="habit-color-container" style="background-color: ${hexToRGBA(data.habit.color, 0.7)}">
          <div class="habit-details-container">
            <img src="" />
            <div class="habit-name" style="color: #444">${data.habit.name}</div>
          </div>
          <div class="round">
            <input type="checkbox" id="checkbox-${name}" ${data.completed ? 'checked' : ''} data-id="${data.id}" data-type="habit" />
            <label for="checkbox-${name}"></label>
          </div>
        </div>
      </div>
    `;
  } else if (type === "task") {
    const name = data.task.name.toLowerCase().replace(/\s+/g, '_');
    return `
      <div class="task" style="border: 3px solid ${data.task.color}">
        <div class="task-details-container">
          <img src="" />
          <div class="task-name" style="color: ${data.task.color}">${data.task.name}</div>
        </div>
        <div class="round">
          <input type="checkbox" id="checkbox-${name}" ${data.completed ? 'checked' : ''} data-id="${data.id}" data-type="task" />
          <label for="checkbox-${name}"></label>
        </div>
      </div>
    `;
  } else {
    console.log("Could not display html");
    return '';
  }
}

function handleCheckboxClick(id, type) {
  const endpoint = `http://localhost:8080/api/${type}s/updateStatus`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  };

  sendRequest(endpoint, type, options);
}

const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

sendRequest(`http://localhost:8080/api/habits?date=${formatDateToYYYYMMDD(new Date())}`, "habit");
sendRequest(`http://localhost:8080/api/tasks?date=${formatDateToYYYYMMDD(new Date())}`, "task");
