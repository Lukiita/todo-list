import { TodoNotFoundError, TodoRepository } from '../../../domain';

export class AddTodoItemUseCase {
  constructor(private todoRepository: TodoRepository) { }

  public async execute(input: AddTodoItemInput): Promise<AddTodoItemOutput> {
    const todo = await this.todoRepository.getById(input.todoId);
    if (!todo) {
      throw new TodoNotFoundError(input.todoId);
    }

    todo.addTodoItem(input.content);
    await this.todoRepository.update(todo);
  }
}

type AddTodoItemInput = {
  todoId: string;
  content: string;
  userId: string;
};

type AddTodoItemOutput = void;
