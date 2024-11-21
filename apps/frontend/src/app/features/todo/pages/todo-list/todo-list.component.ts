import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingService } from '../../../../shared/services/loading.service';
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

  constructor(
    private readonly loadingService: LoadingService,
    private readonly todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.loadingService.present();
    this.todoService.getTodos()
      .pipe(
        finalize(() => this.loadingService.dismiss())
      )
      .subscribe(todos => {
        this.todos = todos;
      });
  }
}
