const dom = {
    newTask: document.getElementById('newTask'),
    addBtn: document.getElementById('addBtn'),
    tasks: document.getElementById('tasks'),
    deleteBtn: document.getElementById('deleteBtn'),
    settingsBtn: document.getElementById('settings')
}

const tasks = [];

dom.settingsBtn.addEventListener('click', function () {
    let settings = document.querySelector('.settings__wrapper');
    settings.style.display = (settings.style.display === 'block') ? 'none' : 'block';
});

dom.addBtn.onclick = () => {
    const newTaskText = dom.newTask.value;
    if (newTaskText) {
        addTask(newTaskText, tasks)
        dom.newTask.value = ''
        showTasks(tasks)
        dom.deleteBtn.removeAttribute('disabled');
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
    console.log(task)
}

function showTasks(list) {
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
}

function deleteTask(id, list) {
    list.forEach((task, idx) => {
        if (task.id == id) {
            delete list[idx]
        }
    })
    console.log(list)
}

dom.deleteBtn.addEventListener('click', function () {
    tasks.length = 0;
    dom.tasks.innerHTML = `<p class="notasks">No tasks</p>`;
})

