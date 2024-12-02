document.getElementById("addTaskBtn").addEventListener("click", addTask);

let pendingTasks = [];
let completedTasks = [];

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();
  if (!title || !description) {
    alert("Please fill in both fields!");
    return;
  }

  const task = {
    title,
    description,
    createdAt: new Date().toLocaleString(),
  };
  pendingTasks.push(task);
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  renderTasks();
}

function markAsComplete(index) {
  const task = pendingTasks.splice(index, 1)[0];
  task.completedAt = new Date().toLocaleString();
  completedTasks.push(task);
  renderTasks();
}

function deleteTask(index, isCompleted) {
  if (isCompleted) {
    completedTasks.splice(index, 1);
  } else {
    pendingTasks.splice(index, 1);
  }
  renderTasks();
}

function renderTasks() {
  const pendingList = document.getElementById("pendingTasksList");
  const completedList = document.getElementById("completedTasksList");
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  pendingTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div>
        <strong>${task.title}</strong><br>
        ${task.description}<br>
        <small>Added: ${task.createdAt}</small>
      </div>
      <div>
        <button onclick="markAsComplete(${index})">Complete</button>
        <button onclick="deleteTask(${index}, false)">Delete</button>
      </div>
    `;
    pendingList.appendChild(listItem);
  });

  completedTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div>
        <strong>${task.title}</strong><br>
        ${task.description}<br>
        <small>Added: ${task.createdAt}</small><br>
        <small>Completed: ${task.completedAt}</small>
      </div>
      <div>
        <button onclick="deleteTask(${index}, true)">Delete</button>
      </div>
    `;
    completedList.appendChild(listItem);
  });
}

renderTasks();
