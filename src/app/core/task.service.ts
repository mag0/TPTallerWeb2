import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Comprar comida', description: 'Comprar frutas y verduras', completed: false },
    { id: 2, title: 'Estudiar Angular', description: 'Revisar los nuevos cambios en Angular v18', completed: false },
    { id: 3, title: 'Hacer ejercicio', description: 'Ir al gimnasio y hacer una hora de cardio', completed: false }
  ];
  private idCounter = 4; // Continuar el contador desde el siguiente ID disponible

  getTasks() {
    return this.tasks;
  }

  addTask(title: string, description: string) {
    this.tasks.push({ id: this.idCounter++, title, description, completed: false });
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }
}
