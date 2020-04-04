// Global variables:

const tasksField = document.getElementById('tasks-field');

// Runs addNewTask function when 'Enter' clicked on user's keyboard:

document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        addNewTask();
    }
})

// Runs addNewTask function on click:

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addNewTask);

// ADD BUTTON WORKS LIKE THIS:

function addNewTask() {
    // Creation of new buttons and input field:
    const newButtonsAndInputField = document.createElement('div');
    newButtonsAndInputField.classList.add('buttons-and-input-field');
    newButtonsAndInputField.setAttribute('draggable', 'true');
    // Creation new field for drag button:
    const newDragButtonField = document.createElement('div');
    newDragButtonField.classList.add('drag-button-field');
    newButtonsAndInputField.append(newDragButtonField);
    // Creation of drag button:
    const newDragButton = document.createElement('button');
    newDragButton.classList.add('drag-button');
    newDragButton.innerHTML = '<span class="four-dots">&#8759;</span>';
    newDragButtonField.appendChild(newDragButton);
    // Creation new field for input:
    const newInputField = document.createElement('div');
    newInputField.classList.add('input-field');
    newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('name', '_input');
    newInput.classList.add('input');
    newInputField.appendChild(newInput);
    newButtonsAndInputField.append(newInputField);
    // Creation new field for delete button:
    const newDeleteButtonField = document.createElement('div');
    // Creation of delete button:
    const newDeleteButton = document.createElement('button');
    newDeleteButton.classList.add('delete-button');
    const span = document.createElement('span');
    span.classList.add('delete-mark');
    span.innerHTML = "&#10005;";
    newDeleteButton.appendChild(span);
    newDeleteButtonField.appendChild(newDeleteButton);
    newButtonsAndInputField.append(newDeleteButtonField);
    appendTask(newButtonsAndInputField);
    // Creation event listener to run deleteTask function:
    span.addEventListener('click', deleteTask);
    dragAndDrop();
}

function appendTask(item) {
    tasksField.append(item);
}

// DELETE BUTTON WORKS LIKE THIS:

const deleteButton = document.getElementById('main-delete-mark');
deleteButton.addEventListener('click', deleteTask);

function deleteTask(e) {
    e.target.parentElement.parentElement.parentElement.remove();
}

// SORT BUTTON WORKS LIKE THIS:

const sortButton = document.getElementById('sort-button');
const arrow = document.querySelector('.arrow-reverse');
const topHr = document.querySelector('.top-hr');
const bottomHr = document.querySelector('.bottom-hr');

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

// DRAG AND DROP WORKS LIKE THIS:
