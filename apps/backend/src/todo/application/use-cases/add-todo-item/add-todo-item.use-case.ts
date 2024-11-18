import { TodoNotFoundError, TodoRepository } from '../../../domain';

export class AddTodoItemUseCase {
  constructor(private todoRepository: TodoRepository) { }

  public async execute(input: CreateTaskInput): Promise<CreateTaskOutput> {
    const todo = await this.todoRepository.getById(input.todoId);
    if (!todo) {
      throw new TodoNotFoundError(input.todoId);
    }

    todo.addTodoItem(input.content);
    await this.todoRepository.update(todo);
  }
}

type CreateTaskInput = {
  todoId: string;
  content: string;
  userId: string;
};

type CreateTaskOutput = void;
