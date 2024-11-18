const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');



app.use(express.json()); // Middleware para interpretar JSON en las solicitudes

app.use(cors()); // middleware para habilitar CORS en server.js


// Datos en memoria para almacenar las tareas
let tasks = [];

// Ruta para crear una nueva tarea
app.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Ruta para listar todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Ruta para actualizar una tarea por ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  
  if (taskIndex === -1) return res.status(404).send('Tarea no encontrada');
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json(tasks[taskIndex]);
});

// Ruta para eliminar una tarea por ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.status(204).send(); // 204 No Content para eliminación exitosa
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
