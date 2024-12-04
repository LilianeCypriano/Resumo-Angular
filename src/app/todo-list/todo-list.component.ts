import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  tasks: { id: number; title: string; completed: boolean }[] = [];
  task: string = '';


  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.fetchTodos()
  }


  fetchTodos(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask(): void {
    if (this.task.trim()) {
      const newTask = { title: this.task.trim(), completed: false }; // Valor padrão
      this.todoService.addTodo(newTask).subscribe((createdTask) => {
        this.tasks.push(createdTask);
        this.task = ''; // Limpa o campo de entrada
      });
    }
  }

  deleteTask(taskId: number): void {
    this.todoService.deleteTodo(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }

}
