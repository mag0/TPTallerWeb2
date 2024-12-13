const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

let tasks = [
  {
    id: 1,
    title: "Comprar víveres",
    description: "Ir al supermercado a comprar víveres.",
    completed: false,
  },
  {
    id: 2,
    title: "Limpiar la casa",
    description: "Limpiar el baño y la cocina.",
    completed: true,
  },
  {
    id: 3,
    title: "Hacer ejercicio",
    description: "Correr 5 km por la mañana.",
    completed: false,
  },
];

app.post("/tasks", (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) return res.status(404).send("Tarea no encontrada");

  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json(tasks[taskIndex]);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.status(204).send();
});

module.exports = app;
