import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { LoadingService } from '../../../../shared/services/loading.service';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  public todos: Todo[] = [];
  public newTodoTitle = '';
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

  public addTodo(): void {
    this.loadingService.present();
    this.todoService.createTodo(this.newTodoTitle)
      .pipe(
        tap(todos => console.log(todos)),
        tap(todos => this.todos = todos),
        finalize(() => {
          this.loadingService.dismiss();
          this.newTodoTitle = '';
        })
      )
      .subscribe();
  }
}
