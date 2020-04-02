const sortButton = document.getElementById('sort-button');
const arrow = document.getElementById('arrow');
const topHr = document.getElementById('top-hr');
const middleHr = document.getElementById('middle-hr');
const bottomHr = document.getElementById('bottom-hr');
const mainBody = document.getElementById('task-list-div');
const input = document.getElementById('input');
const deleteButton = document.querySelector('.delete-button');
const addButton = document.getElementById('add-button');

addButton.addEventListener('click', addNewTask);

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
    newDeleteButton.classList.add('delete-button');
    newDeleteButton.innerHTML = '<span class="delete-mark">&#10005;</span>';
    newDeleteButtonField.appendChild(newDeleteButton);
    newButtonsAndInputField.append(newDeleteButtonField);
    appendTask(newButtonsAndInputField);
}

function appendTask(task) {
    mainBody.append(task);
}

