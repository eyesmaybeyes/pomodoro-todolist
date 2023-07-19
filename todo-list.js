const dom = {
    newTask: document.getElementById('newTask'),
    addBtn: document.getElementById('addBtn'),
    tasks: document.getElementById('tasks'),
    deleteBtn: document.getElementById('deleteBtn'),
}

window.onload = function () {
    const loadedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (loadedTasks) {
        tasks.push(...loadedTasks);
        showTasks(tasks);
    }
};

const tasks = [];

dom.newTask.addEventListener("keyup", function (e) {
    if (e.code === 'Enter') {
        dom.addBtn.click();
    }
});

dom.addBtn.onclick = () => {
    const newTaskText = dom.newTask.value;
    if (newTaskText) {
        addTask(newTaskText, tasks)
        dom.newTask.value = ''
        showTasks(tasks)
    }
}

function addTask(text, list) {
    const timeStamp = Date.now()
    const task = {
        id: timeStamp,
        text,
        isComplete: false
    }
    list.push(task)
    localStorage.setItem('tasks', JSON.stringify(list));
}

function showTasks(list) {
    if (list.length === 0) {
        dom.tasks.innerHTML = '<p class="notasks">No tasks</p>';
        return;
    }
    let htmlList = ''
    list.forEach((task) => {
        const cls = task.isComplete
            ? 'todo__task todo__task_complete'
            : 'todo__task'
        const checked = task.isComplete ? "checked" : ""
        const taskHtml = `<div id = "${task.id}" class="${cls} item">
        <label class="todo__checkbox">
            <input type="checkbox" ${checked} />
            <div class="todo__checkbox-div"></div>
        </label>
        <div class="todo-task__text">${task.text}</div>
        <div class="todo-task__del">X</div>
    </div>`
        htmlList = htmlList + taskHtml
    })
    dom.tasks.innerHTML = htmlList
}

dom.tasks.onclick = (event) => {
    const target = event.target
    const isCheckboxEl = target.classList.contains('todo__checkbox-div')
    const isDeleteEl = target.classList.contains('todo-task__del')

    if (isCheckboxEl) {
        const task = target.parentElement.parentElement
        const taskId = task.getAttribute('id')
        changeTaskStatus(taskId, tasks)
        showTasks(tasks)
    }
    if (isDeleteEl) {
        const task = target.parentElement
        const taskId = task.getAttribute('id')
        console.log(taskId);
        deleteTask(taskId, tasks)
        showTasks(tasks)
    }
}

function changeTaskStatus(id, list) {
    list.forEach((task) => {
        if (task.id == id) {
            task.isComplete = !task.isComplete
        }
    })
    localStorage.setItem('tasks', JSON.stringify(list));
}

function deleteTask(id, list) {
    const index = list.findIndex(task => task.id == id);
    if (index > -1) {
        list.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(list));
    }
}

dom.deleteBtn.addEventListener('click', function () {
    tasks.length = 0;
    localStorage.removeItem('tasks');
    showTasks(tasks);
})
