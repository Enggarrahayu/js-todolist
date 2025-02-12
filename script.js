document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToUI(task.text, task.dueDate, task.completed));
}

function saveTasks() {
  const tasks = [...document.querySelectorAll("li")].map((li) => ({
    text: li.querySelector("span").innerText,
    dueDate: li.querySelector("small").innerText || "",
    completed: li.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const dateInput = document.getElementById("taskDate");
  if (input.value.trim() !== "") {
    addTaskToUI(input.value, dateInput.value);
    saveTasks();
    input.value = "";
    dateInput.value = "";
  }
}

function addTaskToUI(taskText, dueDate, completed = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = taskText;

  const dateLabel = document.createElement("small");
  dateLabel.innerText = dueDate ? dueDate : "No due date";

  const editBtn = document.createElement("button");
  editBtn.innerText = "✏️";
  editBtn.onclick = () => editTask(span, li);

  const toggleBtn = document.createElement("button");
  toggleBtn.innerText = "✔";
  toggleBtn.onclick = () => toggleTask(li);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.onclick = () => deleteTask(li);

  li.appendChild(span);
  li.appendChild(dateLabel);
  li.appendChild(editBtn);
  li.appendChild(toggleBtn);
  li.appendChild(deleteBtn);
  if (completed) li.classList.add("completed");
  li.draggable = true;
  li.ondragstart = dragStart;
  li.ondragover = dragOver;
  li.ondrop = drop;
  
  document.getElementById("taskList").appendChild(li);
}

function editTask(span, li) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = span.innerText;
  input.addEventListener("blur", () => saveEdit(input, span));
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") saveEdit(input, span);
  });
  li.replaceChild(input, span);
  input.focus();
}

function saveEdit(input, span) {
  const newText = input.value.trim();
  if (newText !== "") {
    span.innerText = newText;
    input.parentElement.replaceChild(span, input);
    saveTasks();
  }
}

function toggleTask(li) {
  li.classList.toggle("completed");
  saveTasks();
}

function deleteTask(li) {
  li.remove();
  saveTasks();
}

let draggedItem = null;

function dragStart(event) {
  draggedItem = event.target;
  setTimeout(() => (event.target.style.display = "none"), 0);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  this.parentNode.insertBefore(draggedItem, this);
  draggedItem.style.display = "flex";
  saveTasks();
}
