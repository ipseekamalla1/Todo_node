// document.addEventListener('DOMContentLoaded', () => {
//     loadTasks(); // Fetch and display tasks on page load

//     const taskForm = document.getElementById('taskForm');
//     const taskDueDate = document.getElementById('taskDueDate');

//     // Set the minimum date for the due date field to today
//     const today = new Date().toISOString().split('T')[0];
//     taskDueDate.setAttribute('min', today);

//     // Handle form submission
//     taskForm.addEventListener('submit', (event) => {
//         event.preventDefault();

//         const taskName = document.getElementById('taskName').value;
//         const taskAssigned = document.getElementById('taskAssigned').value;
//         const taskDueDateValue = taskDueDate.value;
//         const taskStatus = document.getElementById('taskStatus').value;
//         const taskIndex = document.getElementById('taskIndex').value;
//         const taskPriority = document.getElementById('taskPriority').value;
//         const taskDescription = document.getElementById('taskDescription').value;

//         const task = {
//             name: taskName,
//             description: taskDescription,
//             assigned: taskAssigned,
//             priority: taskPriority,
//             dueDate: taskDueDateValue,
//             status: taskStatus
//         };

//         if (taskIndex !== '') {
//             // Update existing task
//             updateTask(taskIndex, task);
//         } else {
//             // Add new task
//             createTask(task);
//         }

//         taskForm.reset();
//         document.getElementById('taskIndex').value = '';
//         document.getElementById('modal-toggle').checked = false;
//     });
// });

// // Load all tasks from the server
// function loadTasks() {
//     fetch('/api/tasks')
//         .then(response => response.json())
//         .then(tasks => {
//             displayTasks(tasks);
//         })
//         .catch(error => console.error('Error loading tasks:', error));
// }

// // Create a new task on the server
// function createTask(task) {
//     fetch('/api/tasks', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(task)
//     }).then(response => response.json())
//       .then(() => loadTasks())
//       .catch(error => console.error('Error creating task:', error));
// }

// // Update an existing task on the server
// function updateTask(id, task) {
//     fetch(`/api/tasks/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(task)
//     }).then(response => response.json())
//       .then(() => loadTasks())
//       .catch(error => console.error('Error updating task:', error));
// }

// // Delete a task from the server
// function deleteTask(taskId) {
//     const dialog = confirm("Are you sure you want to delete the task?");
//     if (dialog) {
//         fetch(`/api/tasks/${taskId}`, {
//             method: 'DELETE'
//         }).then(() => loadTasks()) // Reload tasks after deletion
//           .catch(error => console.error('Error deleting task:', error));
//     }
// }

// // Display tasks on the page
// function displayTasks(tasks) {
//     const todoTasksContainer = document.getElementById('todoTasks');
//     const inProgressTasksContainer = document.getElementById('inProgressTasks');
//     const doneTasksContainer = document.getElementById('doneTasks');

//     todoTasksContainer.innerHTML = '<h2>To-Do</h2>';
//     inProgressTasksContainer.innerHTML = '<h2>In Progress</h2>';
//     doneTasksContainer.innerHTML = '<h2>Done</h2>';

//     tasks.forEach((task) => {
//         const taskCard = createTaskCard(task);

//         if (task.status === 'To-Do') {
//             todoTasksContainer.appendChild(taskCard);
//         } else if (task.status === 'In Progress') {
//             inProgressTasksContainer.appendChild(taskCard);
//         } else if (task.status === 'Done') {
//             doneTasksContainer.appendChild(taskCard);
//         }
//     });
// }

// // Create a task card element
// function createTaskCard(task) {
//     const taskCard = document.createElement('div');
//     taskCard.className = 'task-card'; // Add your desired styling class

//     taskCard.innerHTML = `
//         <h3>${task.name}</h3>
//         <p>Description: ${task.description}</p>
//         <p>Assigned to: ${task.assigned}</p>
//         <p>Priority: ${task.priority}</p>
//         <p>Due Date: ${task.dueDate}</p>
//         <p>Status: ${task.status}</p>
//         <button onclick="editTask('${task.id}')">Edit</button>
//         <button onclick="deleteTask('${task.id}')">Delete</button>
//     `;

//     return taskCard;
// }

// // Edit a task by ID
// function editTask(taskId) {
//     fetch(`/api/tasks/${taskId}`)
//         .then(response => response.json())
//         .then(task => {
//             document.getElementById('taskIndex').value = task.id;
//             document.getElementById('taskName').value = task.name;
//             document.getElementById('taskDescription').value = task.description;
//             document.getElementById('taskAssigned').value = task.assigned;
//             document.getElementById('taskDueDate').value = task.dueDate;
//             document.getElementById('taskStatus').value = task.status;
//             document.getElementById('modal-toggle').checked = true;
//         })
//         .catch(error => console.error('Error fetching task for edit:', error));
// }

document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Fetch and display tasks on page load

    const taskForm = document.getElementById('taskForm');
    const taskDueDate = document.getElementById('taskDueDate');

    // Set the minimum date for the due date field to today
    const today = new Date().toISOString().split('T')[0];
    taskDueDate.setAttribute('min', today);

    // Handle form submission
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();


        // Perform validation
        if (!validateAssignedTo()) {
            alert('The "Assigned To" field should contain only alphanumeric characters.');
            return; // Stop form submission
        }


        const taskName = document.getElementById('taskName').value;
        const taskAssigned = document.getElementById('taskAssigned').value;
        const taskDueDateValue = taskDueDate.value;
        const taskStatus = document.getElementById('taskStatus').value;
        const taskIndex = document.getElementById('taskIndex').value;
        const taskPriority = document.getElementById('taskPriority').value;
        const taskDescription = document.getElementById('taskDescription').value;

        const task = {
            name: taskName,
            description: taskDescription,
            assigned: taskAssigned,
            priority: taskPriority,
            dueDate: taskDueDateValue,
            status: taskStatus
        };

        if (taskIndex !== '') {
            // Update existing task
            updateTask(taskIndex, task);
        } else {
            // Add new task
            createTask(task);
        }

        taskForm.reset();
        document.getElementById('taskIndex').value = '';
        document.getElementById('modal-toggle').checked = false;
    });
});



function validateAssignedTo() {
    const taskAssigned = document.getElementById('taskAssigned').value;
    const regex = /^[A-Za-z]+$|^[1-9]\d*$/;

    return regex.test(taskAssigned);
}

// Get all tasks from the server.js file
function loadTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
        })
        .catch(error => console.error('Error loading tasks:', error));
}

// Create a new task on the server
function createTask(task) {
    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json())
      .then(() => loadTasks())
      .catch(error => console.error('Error creating task:', error));
}

// Update an existing task on the server
function updateTask(id, task) {
    fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json())
      .then(() => loadTasks())
      .catch(error => console.error('Error updating task:', error));
}

// Delete a task from the server
function deleteTask(taskId) {
    const dialog = confirm("Are you sure you want to delete the task?");
    if (dialog) {
        fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        }).then(() => loadTasks()) // Reload tasks after deletion
          .catch(error => console.error('Error deleting task:', error));
    }
}

// Display tasks on the page
function displayTasks(tasks) {
    const todoTasksContainer = document.getElementById('todoTasks');
    const inProgressTasksContainer = document.getElementById('inProgressTasks');
    const doneTasksContainer = document.getElementById('doneTasks');

    // Clear previous tasks
    todoTasksContainer.innerHTML = '<h2 class="sub_heading">To-Do</h2>';
    inProgressTasksContainer.innerHTML = '<h2 class="sub_heading">In Progress</h2>';
    doneTasksContainer.innerHTML = '<h2 class="sub_heading">Done</h2>';

    tasks.forEach((task) => {
        const taskCard = createTaskCard(task);

        if (task.status === 'To-Do') {
            todoTasksContainer.appendChild(taskCard);
        } else if (task.status === 'In Progress') {
            inProgressTasksContainer.appendChild(taskCard);
        } else if (task.status === 'Done') {
            doneTasksContainer.appendChild(taskCard);
        }
    });
}

// Create a task card element with improved styling
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task_card';

    const priorityCard = document.createElement('div');
    priorityCard.className = `priority_card ${task.priority}`;
    priorityCard.textContent = task.priority;
    taskCard.appendChild(priorityCard);

    const filterRow = document.createElement('div');
    filterRow.className = 'filter_row';
    filterRow.onclick = () => viewTask(task.id);

    const filterCard = document.createElement('div');
    filterCard.className = 'filter_card';
    filterCard.textContent = task.assigned;
    filterRow.appendChild(filterCard);

    taskCard.appendChild(filterRow);

    const taskHeading = document.createElement('p');
    taskHeading.className = 'sub_heading_product';
    taskHeading.textContent = task.name;
    taskCard.appendChild(taskHeading);
    taskHeading.onclick = () => viewTask(task.id);

    const rowFlex = document.createElement('div');
    rowFlex.className = 'row_flex';

    const dateContainer = document.createElement('div');
    dateContainer.className = 'row_flex no_margin';

    const calendarIcon = document.createElement('i');
    calendarIcon.className = 'fa fa-calendar';
    dateContainer.appendChild(calendarIcon);

    const dueDate = document.createElement('p');
    dueDate.className = 'date';
    dueDate.textContent = task.dueDate;
    dateContainer.appendChild(dueDate);
    dateContainer.onclick = () => viewTask(task.id);

    rowFlex.appendChild(dateContainer);

    const gap = document.createElement('div');
    gap.className = 'gap';

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa fa-trash';
    deleteIcon.onclick = () => deleteTask(task.id);
    gap.appendChild(deleteIcon);

    const editIcon = document.createElement('i');
    editIcon.className = 'fa fa-pencil';
    editIcon.onclick = () => editTask(task.id);
    gap.appendChild(editIcon);

    rowFlex.appendChild(gap);
    taskCard.appendChild(rowFlex);

    return taskCard;
}

// View detailed task information in a modal
function viewTask(taskId) {
    fetch(`/api/tasks/${taskId}`)
        .then(response => response.json())
        .then(task => {
            document.getElementById('displayTaskName').innerHTML = task.name;
            document.getElementById('displayDescription').innerHTML = task.description;
            document.getElementById('displaytaskAssigned').innerHTML = task.assigned;
            document.getElementById('displayTaskPriority').innerHTML = task.priority;
            document.getElementById('displayTaskDueDate').innerHTML = task.dueDate;
            document.getElementById('displayTaskStatus').innerHTML = task.status;
            document.getElementById('modal-toggle-2').checked = true;
        })
        .catch(error => console.error('Error fetching task details:', error));
}

// Edit a task by ID
function editTask(taskId) {
    fetch(`/api/tasks/${taskId}`)
        .then(response => response.json())
        .then(task => {
            document.getElementById('taskIndex').value = task.id;
            document.getElementById('taskName').value = task.name;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskAssigned').value = task.assigned;
            document.getElementById('taskDueDate').value = task.dueDate;
            document.getElementById('taskStatus').value = task.status;
            document.getElementById('modal-toggle').checked = true;
        })
        .catch(error => console.error('Error fetching task for edit:', error));
}


