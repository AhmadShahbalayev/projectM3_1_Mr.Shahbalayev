const sortButton = document.getElementById('sort-button');
const arrow = document.querySelector('.arrow-reverse');
const topHr = document.querySelector('.top-hr');
const middleHr = document.querySelector('.middle-hr');
const bottomHr = document.querySelector('.bottom-hr');
const mainBody = document.getElementById('task-list-div');
const input = document.getElementById('input-id');
const deleteButton = document.getElementById('button-delete');
const addButton = document.getElementById('add-button');

addButton.addEventListener('click', addNewTask);

document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        addNewTask();
    }
})

function addNewTask() {
    // CREATES NEW BUTTONS AND INPUT FIELD:
    const newButtonsAndInputField = document.createElement('div');
    newButtonsAndInputField.classList.add('buttons-and-input-field');
    // CREATES NEW DRAG BUTTON FIELD:
    const newDragButtonField = document.createElement('div');
    newDragButtonField.classList.add('drag-button-field');
    newButtonsAndInputField.append(newDragButtonField);
    // CREATES NEW DRAG BUTTON:
    const newDragButton = document.createElement('button');
    newDragButton.classList.add('drag-button');
    newDragButton.innerHTML = '<span class="four-dots">&#8759;</span>';
    newDragButtonField.appendChild(newDragButton);
    // CREATES NEW INPUT FIELD:
    const newInputField = document.createElement('div');
    newInputField.classList.add('input-field');
    newInput = document.createElement('input');
    newInput.classList.add('input');
    newInputField.appendChild(newInput);
    newButtonsAndInputField.append(newInputField);
    // CREATES NEW DELETE BUTTON FIELD:mainBody
    const newDeleteButtonField = document.createElement('div');
    // CREATES NEW DELETE BUTTON:
    const newDeleteButton =document.createElement('button');
    // newDeleteButton.addEventListener('click', deleteTask)
    newDeleteButton.classList.add('delete-button');
    const span = document.createElement('span');
    span.classList.add('delete-mark');
    span.innerHTML = "&#10005;";
    newDeleteButton.appendChild(span);
    span.addEventListener('click', deleteTask);
    newDeleteButtonField.appendChild(newDeleteButton);
    newButtonsAndInputField.append(newDeleteButtonField);
    appendTask(newButtonsAndInputField);
}

function appendTask(task) {
    mainBody.append(task);
}

function deleteTask(e) {
    e.target.parentElement.parentElement.parentElement.remove();
}

deleteButton.addEventListener('click', deleteTask);

sortButton.addEventListener('click', sortTasks);

function sortTasks() {
    arrow.className = 'arrow';
    topHr.style.width = '7.5px';
    bottomHr.style.width = '15px';
    let tasks = document.querySelectorAll('.input');
    let tasksArr = [];
    tasks.forEach(item => tasksArr.push(item.value));
    tasksArr.sort();
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].value = tasksArr[i];
    }
    sortButton.removeEventListener('click', sortTasks);
    sortButton.addEventListener('click', reverseSortTasks);
}

function reverseSortTasks() {
    arrow.className = 'arrow-reverse';
    topHr.style.width = '15px';
    bottomHr.style.width = '7.5px';
    let tasks = document.querySelectorAll('.input');
    let tasksArr = [];
    tasks.forEach(item => tasksArr.push(item.value));
    tasksArr.reverse();
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].value = tasksArr[i];
    }
    sortButton.removeEventListener('click', reverseSortTasks);
    sortButton.addEventListener('click', sortTasks);
}

