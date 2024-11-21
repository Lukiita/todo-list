import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { LoadingService } from '../../../../shared/services/loading.service';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [
    DragDropModule,
    FormsModule,
    NgClass,
    RouterLink,
  ],
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  public todo!: Todo;
  public showCreateTaskForm = false;
  public newTaskName = '';

  constructor(
    private readonly loadingService: LoadingService,
    private readonly route: ActivatedRoute,
    private readonly todoService: TodoService
  ) { }

  ngOnInit() {
    const todoId = this.route.snapshot.paramMap.get('todoId');
    this.getTodo(todoId as string);
  }

  private getTodo(todoId: string): void {
    this.loadingService.present();
    this.todoService.getById(todoId)
      .pipe(
        finalize(() => this.loadingService.dismiss())
      )
      .subscribe(todo => {
        this.todo = todo;
      });
  }

  public onDrop(event: CdkDragDrop<string[]>): void {
    const { currentIndex, previousIndex } = event;
    const todoItem = this.todo.items[previousIndex];
    console.log(todoItem.content);
    moveItemInArray(this.todo.items, previousIndex, currentIndex);
    this.todoService.updateTodoItemOrder(this.todo.id, todoItem.id, currentIndex).subscribe();
  }

  public addTodoItem(): void {
    if (this.newTaskName.trim() && this.newTaskName.length >= 5) {
      this.todoService.addTodoItem(this.todo.id, this.newTaskName)
        .pipe(
          tap(todo => this.todo = todo)
        )
        .subscribe();
    }
  }

  public toggleTodoItemCompletion(todoItemId: string): void {
    this.todoService.toggleTodoItemCompletion(this.todo.id, todoItemId).subscribe();
  }
}
