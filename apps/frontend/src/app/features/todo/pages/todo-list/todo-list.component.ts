import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Todo {
  id: string;
  title: string;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  // Lista de Todos
  todos: Todo[] = [
    { id: 'todo-1', title: 'Tarefas de Trabalho' },
    { id: 'todo-2', title: 'Tarefas Pessoais' },
    { id: 'todo-3', title: 'Lista de Compras' },
  ];
}
