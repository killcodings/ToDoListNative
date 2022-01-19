const addTaskBtn = document.querySelector("#add-task-btn");
const deskTaskInput = document.querySelector("#description-task");
const todosWrapper = document.querySelector(".todos-wrapper");

let tasks = [];
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

function Task(description) {
  this.description = description;
  this.completed = false; // ?
}

const createTemplate = (item, index) =>
  `<div class="todo-item ${item.completed ? "checked" : ""}">
        <div class="description">${item.description}</div>
        <div class="buttons">
            <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" 
            ${item.completed ? "checked" : ""}/>
            <button onclick="delTask(${index})" class="btn-delete">Delete</button>
        </div>
    </div>`;

const filterTasks = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed == false);
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed == true);
  tasks = [...activeTasks, ...completedTasks];
};

let todoItemElems = [];

const fillHtmlList = () => {
  todosWrapper.innerHTML = "";
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      todosWrapper.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll(".todo-item");
  }
};
fillHtmlList();

const updateLocal = () => localStorage.setItem("tasks", JSON.stringify(tasks));

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add("checked");
  } else {
    todoItemElems[index].classList.remove("checked");
  }
  updateLocal();
  fillHtmlList();
};

const delTask = (index) => {
  //   console.log(index);
  todoItemElems[index].classList.add("delition");
  setTimeout(() => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
  }, 1000);
};

addTaskBtn.addEventListener("click", () => {
  tasks.push(new Task(deskTaskInput.value));
  updateLocal();
  fillHtmlList();
  deskTaskInput.value = "";
});
