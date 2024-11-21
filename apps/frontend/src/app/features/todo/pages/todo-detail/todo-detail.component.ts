import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { LoadingService } from '../../../../shared/services/loading.service';
import { Todo, TodoItem, TodoService } from '../../services/todo.service';

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
export class TodoDetailComponent implements OnInit, AfterViewChecked {
  @ViewChild('editInput') editInput!: ElementRef;

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

  ngAfterViewChecked(): void {
    if (this.editInput) {
      this.editInput.nativeElement.focus();
    }
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
    moveItemInArray(this.todo.items, previousIndex, currentIndex);
    this.todoService.updateTodoItemOrder(this.todo.id, todoItem.id, currentIndex).subscribe();
  }

  public startEditing(item: TodoItem): void {
    this.todo.items.forEach((t) => (t.isEditing = false));
    item.isEditing = true;
  }

  stopEditing(item: TodoItem): void {
    item.isEditing = false;

    // Validação: não permitir que o campo fique vazio
    if (!item.content.trim()) {
      alert('O nome da tarefa não pode ser vazio!');
      item.content = 'Nova tarefa'; // Valor padrão se vazio
    }
  }

  public addTodoItem(): void {
    this.loadingService.present();
    if (this.newTaskName.trim() && this.newTaskName.length >= 5) {
      this.todoService.addTodoItem(this.todo.id, this.newTaskName)
        .pipe(
          tap(todo => this.todo = todo),
          tap(() => this.newTaskName = ''),
          finalize(() => this.loadingService.dismiss()),
        )
        .subscribe();
    }
  }

  public toggleTodoItemCompletion(todoItemId: string): void {
    this.todoService.toggleTodoItemCompletion(this.todo.id, todoItemId).subscribe();
  }
}
