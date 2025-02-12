document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToUI(task.text, task.dueDate, task.completed));
}

function saveTasks() {
    const tasks = [...document.querySelectorAll("li")].map(li => ({
        text: li.querySelector("span").innerText,
        dueDate: li.querySelector("small").innerText || "",
        completed: li.classList.contains("completed")
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
    
    li.appendChild(span);
    li.appendChild(dateLabel);
    if (completed) li.classList.add("completed");

    document.getElementById("taskList").appendChild(li);
}

