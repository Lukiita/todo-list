import { Todo, TodoRepository } from '../../../domain';

export class CreateTodoUseCase {
  constructor(private todoRepository: TodoRepository) { }

  public async execute(input: CreateTaskInput): Promise<CreateTaskOutput> {
    const todoList = Todo.create({
      title: input.title,
      ownerId: input.userId,
    });

    await this.todoRepository.create(todoList);
    return { todoId: todoList.id };
  }
}

type CreateTaskInput = {
  title: string;
  userId: string;
};

type CreateTaskOutput = {
  todoId: string;
};
