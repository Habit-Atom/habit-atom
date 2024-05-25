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

  const styles = data.map(d => createStyles(d, type)).join('');
  allStyles.push(styles); // Collect styles for each request

  const html = data.map(d => createHtml(d, type)).join('');
  container.innerHTML = html;

  // Set the collected styles to the dynamic-styles element
  document.getElementById('dynamic-styles').innerHTML = allStyles.join('');
}

// Function to create dynamic CSS for each habit/task
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
  }else if (type === "task"){
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


// Function to create habit/task HTML using template literals
function createHtml(data, type) {
  if (type === "habit") {
    const name = data.habit.name.toLowerCase().replace(/\s+/g, '_');
    return `
      <div class="habit" style="border: 3px solid ${data.habit.color}">
        <div class="habit-details-container">
          <img src="" />
          <div class="habit-name" style="color: ${data.habit.color}">${data.habit.name}</div>
        </div>
        <div class="round">
          <input type="checkbox" id="checkbox-${name}" ${data.completed ? 'checked' : ''}/>
          <label for="checkbox-${name}"></label>
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
          <input type="checkbox" id="checkbox-${name}" ${data.completed ? 'checked' : ''} />
          <label for="checkbox-${name}"></label>
        </div>
      </div>
    `;
  } else {
    console.log("Could not display html");
    return '';
  }
}


sendRequest('http://localhost:8080/api/habits', "habit");
sendRequest('http://localhost:8080/api/tasks', "task");

