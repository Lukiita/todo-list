import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Todo = {
  id: string;
  title: string;
  ownerId: string;
  sharedWith: string[];
  items: TodoItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type TodoItem = {
  id: string;
  content: string;
  todoId: string;
  isCompleted: boolean;
  completedAt: Date | null;
  order: number;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private readonly http: HttpClient) { }

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/todos');
  }

  public getById(todoId: string): Observable<Todo> {
    return this.http.get<Todo>(`/todos/${todoId}`);
  }

  public addTodoItem(todoId: string, content: string): Observable<Todo> {
    return this.http.post<Todo>(`/todos/${todoId}/items`, { content });
  }

  public toggleTodoItemCompletion(todoId: string, todoItemId: string): Observable<void> {
    return this.http.put<void>(`/todos/${todoId}/items/${todoItemId}/toggle-completion`, {});
  }

  public updateTodoItemOrder(todoId: string, itemId: string, newOrder: number): Observable<void> {
    return this.http.put<void>(`/todos/${todoId}/items/${itemId}/order`, { newOrder });
  }
}
