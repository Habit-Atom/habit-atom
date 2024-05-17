// Set the JWT token
function storeToken(token) {
  chrome.storage.local.set({ jwtToken: token }, function() {
    console.log('Token is stored.');
  });
}

function sendRequest(endpoint, type, options = {}) {
  chrome.storage.local.get(['jwtToken'], function(result) {
    const token = result.jwtToken;
    if (token) {
      options.headers = options.headers || {};
      options.headers['Authorization'] = 'Bearer ' + token;

      fetch(endpoint, options)
        .then(response => response.json())
        .then(data => {
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
      console.error('No token found');
    }
  });
}

let allStyles = []; // Initialize an array to hold all styles

function display(data, container, type) {
  container.innerHTML = '';

  const styles = data.map(d => createStyles(d)).join('');
  allStyles.push(styles); // Collect styles for each request

  const html = data.map(d => createHtml(d, type)).join('');
  container.innerHTML = html;

  // Set the collected styles to the dynamic-styles element
  document.getElementById('dynamic-styles').innerHTML = allStyles.join('');
}

// Function to create dynamic CSS for each habit/task
function createStyles(data) {
  const name = data.name.toLowerCase().replace(/\s+/g, '_');
  return `
    .round input[type="checkbox"]:checked + label[for="checkbox-${name}"] {
      background-color: ${data.color};
      border-color: ${data.color};
    }
    .round label[for="checkbox-${name}"] {
      border: 3px solid ${data.color};
    }
  `;
}

// Function to create habit/task HTML using template literals
function createHtml(data, type) {
  const name = data.name.toLowerCase().replace(/\s+/g, '_');
  if (type === "habit") {
    return `
      <div class="habit" style="border: 3px solid ${data.color}">
        <div class="habit-details-container">
          <img src="${data.icon}" />
          <div class="habit-name" style="color: ${data.color}">${data.name}</div>
        </div>
        <div class="round">
          <input type="checkbox" id="checkbox-${name}" />
          <label for="checkbox-${name}"></label>
        </div>
      </div>
    `;
  } else if (type === "task") {
    return `
      <div class="task" style="border: 3px solid ${data.color}">
        <div class="task-details-container">
          <img src="${data.icon}" />
          <div class="task-name" style="color: ${data.color}">${data.name}</div>
        </div>
        <div class="round">
          <input type="checkbox" id="checkbox-${name}" />
          <label for="checkbox-${name}"></label>
        </div>
      </div>
    `;
  } else {
    console.log("Could not display html");
    return '';
  }
}

storeToken('your-jwt-token-here');
sendRequest('http://localhost:8080/api/habits', "habit");
sendRequest('http://localhost:8080/api/tasks', "task");
