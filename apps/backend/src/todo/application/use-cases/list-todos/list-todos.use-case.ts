import { TodoProps, TodoRepository } from '../../../domain';

export class ListTodosUseCase {
  constructor(
    private readonly todoRepository: TodoRepository
  ) { }

  public async execute(input: ListTodosInput): Promise<ListTodosOutput> {
    const todos = await this.todoRepository.getByUserAccess(input.userId, input.email);
    return todos.map((todo) => todo.toJSON());
  }
}

type ListTodosInput = {
  userId: string;
  email: string;
};

type ListTodosOutput = TodoProps[];
