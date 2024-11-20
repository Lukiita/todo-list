import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface Todo {
  id: string;
  title: string;
  tasks: Task[];
}

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
  todo: Todo | undefined;
  showCreateTaskForm = false;
  newTaskName = '';
  todos: Todo[] = [
    {
      id: 'todo-1',
      title: 'Tarefas de Trabalho',
      tasks: [
        { id: 'task-1', name: 'Finalizar código da funcionalidade', completed: false },
        { id: 'task-2', name: 'Revisar pull requests', completed: true },
        { id: 'task-3', name: 'Preparar agenda da reunião', completed: false },
      ],
    },
    {
      id: 'todo-2',
      title: 'Tarefas Pessoais',
      tasks: [
        { id: 'task-4', name: 'Fazer uma caminhada', completed: false },
        { id: 'task-5', name: 'Comprar mantimentos', completed: false },
        { id: 'task-6', name: 'Limpar a casa', completed: false },
      ],
    },
    {
      id: 'todo-3',
      title: 'Lista de Compras',
      tasks: [
        { id: 'task-7', name: 'Comprar leite', completed: false },
        { id: 'task-8', name: 'Comprar pão', completed: false },
        { id: 'task-9', name: 'Comprar ovos', completed: false },
      ],
    },
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const todoId = this.route.snapshot.paramMap.get('todoId');
    if (todoId) {
      this.todo = this.todos.find((todo) => todo.id === todoId);
    }
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

  addTask() {
    if (this.newTaskName.trim()) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        name: this.newTaskName,
        completed: false,
      };
      this.todo?.tasks.push(newTask);
      this.newTaskName = '';
      this.showCreateTaskForm = false;
    }
  }

  removeTask(index: number) {
    if (index !== -1) {
      this.todo?.tasks.splice(index, 1);
    }
  }

  shareTask(task: Task) {
    alert(`Compartilhando a task: ${task.name}`);
  }

  // Marcar task como concluída
  markAsCompleted(taskId: string) {
    const task = this.todo?.tasks.find((task) => task.id === taskId) as Task;
    task.completed = !task.completed;
    console.log('Task', task);
  }
}
