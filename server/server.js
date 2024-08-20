const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const TASKS_FILE = path.join(__dirname, 'tasks.json');



app.use(express.static(path.join(__dirname, '../public')));

// Gives index.html when tyring to run the node file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


//function to read the tasks.json file
function readTasks() {
    try {
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// funnction to write in the tasks.json file
function writeTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}


// Get all tasks
app.get('/api/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});


// Get a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Create a new task
app.post('/api/tasks', (req, res) => {
    const tasks = readTasks();
    const newTask = { id: Date.now().toString(), ...req.body };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// Edit an existing task by ID
app.put('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        writeTasks(tasks);
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const newTasks = tasks.filter(t => t.id !== req.params.id);
    if (tasks.length === newTasks.length) {
        return res.status(404).json({ message: 'Task not found' });
    }
    writeTasks(newTasks);
    res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
