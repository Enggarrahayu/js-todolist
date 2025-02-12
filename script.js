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

  li.appendChild(span);
  li.appendChild(dateLabel);
  li.appendChild(editBtn);
  
  if (completed) li.classList.add("completed");

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
