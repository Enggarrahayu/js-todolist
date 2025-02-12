document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToUI(task));
}

function saveTasks() {
  const tasks = [...document.querySelectorAll("li")].map((li) => li.innerText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() !== "") {
    addTaskToUI(input.value);
    saveTasks();
    input.value = "";
  }
}

function addTaskToUI(taskText) {
  const li = document.createElement("li");
  li.innerText = taskText;
  document.getElementById("taskList").appendChild(li);
}
