import { TodoNotFoundError, TodoRepository } from '../../../domain';

export class ShareTodoUseCase {
  constructor(private todoRepository: TodoRepository) { }

  public async execute(input: ShareTodoInput): Promise<ShareTodoOutput> {
    const todo = await this.todoRepository.getById(input.todoId);
    if (!todo) {
      throw new TodoNotFoundError(input.todoId);
    }

    todo.shareWith(input.emailToShare);
    await this.todoRepository.update(todo);
  }
}

type ShareTodoInput = {
  todoId: string;
  userId: string;
  emailToShare: string;
};

type ShareTodoOutput = void;
