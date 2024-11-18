import { Todo, TodoRepository } from '../../../domain';

export class CreateTodoUseCase {
  constructor(private todoRepository: TodoRepository) { }

  public async execute(input: CreateTodoInput): Promise<CreateTodoOutput> {
    const todoList = Todo.create({
      title: input.title,
      ownerId: input.userId,
    });

    await this.todoRepository.create(todoList);
    return { todoId: todoList.id };
  }
}

type CreateTodoInput = {
  title: string;
  userId: string;
};

type CreateTodoOutput = {
  todoId: string;
};
