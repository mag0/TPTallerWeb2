import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../../core/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  newTaskTitle = '';
  newTaskDescription = '';
  tasks: Task[] = [];
  taskBeingEdited: Task | null = null;

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    if (this.newTaskTitle.trim() && this.newTaskDescription.trim()) {
      const newTask: Task = {
        title: this.newTaskTitle.trim(),
        description: this.newTaskDescription.trim(),
        completed: false
      };
      this.taskService.createTask(newTask).subscribe(task => {
        this.tasks.push(task);
        this.newTaskTitle = '';
        this.newTaskDescription = '';
      });
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  toggleCompletion(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task.id!, { completed: task.completed }).subscribe();
  }

  editTask(task: Task) {
    this.taskBeingEdited = { ...task }; // Crear una copia del objeto tarea
  }

  updateTask() {
    if (this.taskBeingEdited) {
      this.taskService.updateTask(this.taskBeingEdited.id!, this.taskBeingEdited).subscribe(updatedTask => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) this.tasks[index] = updatedTask;
        this.taskBeingEdited = null;
      });
    }
  }

  cancelEdit() {
    this.taskBeingEdited = null;
  }
}
