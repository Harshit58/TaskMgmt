const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addTaskToList(tasks, taskId, text, priority) {
  tasks.push({ taskId: taskId, text: text, priority: priority });
  return tasks;
}

function editTask(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

function editTaskText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

function sortTaskByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

function deleteTask(tasks, taskId) {
  return task1.priority - task2.priority;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = req.query.taskId;
  let result = tasks.filter((task) => task.taskId != taskId);
  res.json({ tasks: result });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((task) => task.priority === priority);
  res.json({ tasks: result });
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId = req.query.taskId;
  let text = req.query.text;
  let result = editTaskText(tasks, taskId, text);
  res.json({ tasks: result });
});

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = req.query.taskId;
  let priority = req.query.priority;
  let result = editTask(tasks, taskId, priority);
  res.json({ tasks: result });
});

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksCopy = tasks.slice();
  let result = tasksCopy.sort(sortTaskByPriority);
  res.json({ tasks: result });
});

app.get('/tasks/add', (req, res) => {
  let taskId = req.query.taskId;
  let text = req.query.text;
  let priority = req.query.priority;
  let result = addTaskToList(tasks, taskId, text, priority);
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
