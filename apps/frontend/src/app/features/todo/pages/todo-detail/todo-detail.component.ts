import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
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
export class TodoDetailComponent implements OnInit {
  public todo!: Todo;
  public showCreateTaskForm = false;
  public newTaskName = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly todoService: TodoService
  ) { }

  ngOnInit() {
    const todoId = this.route.snapshot.paramMap.get('todoId');
    this.getTodo(todoId as string);
  }

  private getTodo(todoId: string): void {
    this.todoService.getById(todoId)
      .subscribe(todo => {
        this.todo = todo;
      });
  }

  onDragStart(event: any, taskId: string) {
    event.dataTransfer.setData('text', taskId);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event);
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

  shareTask(todoItemId: string) {
    alert(`Compartilhando a task: ${todoItemId}`);
  }

  // Marcar task como concluída
  markAsCompleted(todoItemId: string) {
    const task = this.todo?.items.find((item) => item.id === todoItemId) as TodoItem;
    task.isCompleted = !task.isCompleted;
    console.log('Task', task);
  }
}
