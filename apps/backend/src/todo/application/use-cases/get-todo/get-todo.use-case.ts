import { TodoNotFoundError, TodoProps, TodoRepository } from '../../../domain';

export class GetTodoUseCase {
  constructor(private todoRepository: TodoRepository) { }

  public async execute(input: CreateTodoInput): Promise<CreateTodoOutput> {
    const todo = await this.todoRepository.getById(input.todoId);
    if (!todo) {
      throw new TodoNotFoundError(input.todoId);
    }

    return todo.toJSON();
  }
}

type CreateTodoInput = {
  todoId: string;
};

type CreateTodoOutput = TodoProps;
