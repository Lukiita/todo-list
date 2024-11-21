import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  public todos: Todo[] = [];

  constructor(private readonly todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos;
      });
  }
}
