// When page loads,  this script creates and adds one empty task as default:

window.addEventListener('load', addNewTask);

// Runs addNewTask function when 'Enter' key is pressed or add-button was clicked by user:

document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        addNewTask();
    }
})

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addNewTask);

// Funciton for to create and add new tasks to the section:

function addNewTask() {

    // Creation of new input box:
    const inputBox = document.createElement('div');
    inputBox.classList.add('input-box');

    // Creation of new drag tool:
    const dragTool = document.createElement('div');
    dragTool.classList.add('drag-tool');
    const fourDots = document.createElement('span');
    fourDots.classList.add('four-dots');
    fourDots.innerHTML = '&#8759;';
    dragTool.append(fourDots);

    // Creation of new input field:
    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('name', '_input');
    inputField.classList.add('input-field');

    // Creation of new delete butotn:
    const deleteButton = document.createElement('div');
    deleteButton.classList.add('delete-button');
    const deleteMark = document.createElement('span');
    deleteMark.classList.add('delete-mark');
    deleteMark.innerHTML = '&#10005;';
    deleteMark.addEventListener('click', deleteTask);
    deleteButton.append(deleteMark);

    // Putting everything together:
    inputBox.append(dragTool, inputField, deleteButton);
    let section = document.querySelector('section');
    section.append(inputBox);
    dragAndDrop(dragTool, section);
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

function dragAndDrop(dragTool, section) {
    dragTool.addEventListener('mousedown', mouseDown);
    function mouseDown() {
        let rect = dragTool.getBoundingClientRect().height;
        window.addEventListener('mousemove', mouseMove);
        function mouseMove(e) {
            dragTool.parentElement.classList.add('absolute');
            let y = e.clientY - rect / 2;
            console.log('Y: ' + y);
            let newY = y - section.offsetTop + 'px';
            dragTool.parentElement.style.top = newY;
            console.log('New TOP: ', dragTool.parentElement.style.top);
        }
        window.addEventListener('mouseup', mouseUp);
        function mouseUp() {
            window.removeEventListener('mousemove', mouseMove);

            let allTasks = document.querySelectorAll('.input-box');
            let arr = Array.from(allTasks);
            arr.sort((a, b) => {
                a = a.getBoundingClientRect().top;
                b = b.getBoundingClientRect().top;
                return a - b;
            })

            dragTool.parentElement.classList.remove('absolute');

            console.log(arr);

            section.innerHTML = '';

            arr.forEach(item => {
                section.append(item);
            })

            window.removeEventListener('mouseup', mouseUp);
        }
    }
}



