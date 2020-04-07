// Runs addNewTask function when 'Enter' key is pressed by user:

window.addEventListener('load', addNewTask);

document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        addNewTask();
    }
})

// Runs addNewTask function on click: 

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addNewTask);

function addNewTask() {

    // Creation of new input box:
    const newInputBox = document.createElement('div');
    newInputBox.classList.add('input-box');

    // Creation of new drag tool:
    const newDragTool = document.createElement('div');
    newDragTool.classList.add('drag-tool');
    newDragTool.setAttribute('draggable', 'true');
    const newFourDots = document.createElement('span');
    newFourDots.classList.add('four-dots');
    newFourDots.innerHTML = '&#8759;';
    newDragTool.append(newFourDots);

    // Creation of new input field:
    const newInputField = document.createElement('input');
    newInputField.setAttribute('type', 'text');
    newInputField.setAttribute('name', '_input');
    newInputField.classList.add('input-field');

    // Creation of new delete butotn:
    const newDeleteButton = document.createElement('div');
    newDeleteButton.classList.add('delete-button');
    const newDeleteMark = document.createElement('span');
    newDeleteMark.classList.add('delete-mark');
    newDeleteMark.innerHTML = '&#10005;';
    newDeleteMark.addEventListener('click', deleteTask);
    newDeleteButton.append(newDeleteMark);

    // Putting everything together:
    newInputBox.append(newDragTool, newInputField, newDeleteButton);
    let section = document.querySelector('section');
    section.append(newInputBox);
    dragAndDrop();
}

// Function for deleting tasks:

function deleteTask(e) {
    if (e.target.parentElement.parentElement.parentElement.childElementCount > 1) {
        e.target.parentElement.parentElement.remove();
    } else {
        e.target.parentElement.previousSibling.value = '';
    }
}

// Function for sorting tasks in alphabetical order, or reverse:

const sortButton = document.getElementById('sort-button');
const arrow = document.querySelector('.arrow-reverse');
const topHr = document.querySelector('.top-hr');
const bottomHr = document.querySelector('.bottom-hr');

sortButton.addEventListener('click', sortTasks);

function sortTasks() {
    arrow.className = 'arrow';
    topHr.style.width = '7.5px';
    bottomHr.style.width = '15px';
    let tasks = document.querySelectorAll('.input-field');
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
    let tasks = document.querySelectorAll('.input-field');
    let tasksArr = [];
    tasks.forEach(item => tasksArr.push(item.value));
    tasksArr.reverse();
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].value = tasksArr[i];
    }
    sortButton.removeEventListener('click', reverseSortTasks);
    sortButton.addEventListener('click', sortTasks);
}


// Function for drag and drop:
function dragAndDrop() {
    const container = document.querySelector('section');
    const draggables = document.querySelectorAll('.drag-tool');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.parentNode.classList.add('dragging');
        })

        draggable.addEventListener('dragend', () => {
            draggable.parentNode.classList.remove('dragging');
        })
    })

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    })
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.input-box:not(.dragging')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offest) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

