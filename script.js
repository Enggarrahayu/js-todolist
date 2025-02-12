function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() !== "") {
      const li = document.createElement("li");
      li.innerText = input.value;
      document.getElementById("taskList").appendChild(li);
      input.value = "";
  }
}