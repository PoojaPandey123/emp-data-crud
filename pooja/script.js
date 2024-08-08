document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const taskItem = document.createElement('li');

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskItem.appendChild(taskContent);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.addEventListener('click', () => editTask(taskItem));
        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => deleteTask(taskItem));
        taskItem.appendChild(deleteButton);

        taskItem.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                taskItem.classList.toggle('completed');
            }
        });

        taskList.appendChild(taskItem);
        taskInput.value = '';
    }

    function editTask(taskItem) {
        const taskContent = taskItem.firstChild;
        const newTaskText = prompt('Edit the task:', taskContent.textContent);
        if (newTaskText !== null) {
            taskContent.textContent = newTaskText.trim();
        }
    }

    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
    }
});
