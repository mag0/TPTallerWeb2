import { Component } from '@angular/core';
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
export class TaskListComponent {
  newTaskTitle = '';
  newTaskDescription = '';
  mensajeErrorTitulo = '';
  mensajeErrorDescripcion = '';

  constructor(public taskService: TaskService) {}

  addTask() {
    if (this.newTaskTitle.trim() && this.newTaskDescription.trim()) {
      this.taskService.addTask(this.newTaskTitle.trim(), this.newTaskDescription.trim());
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  toggleCompletion(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
  }
}

