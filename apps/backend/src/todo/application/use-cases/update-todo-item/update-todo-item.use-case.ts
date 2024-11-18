import { TodoNotFoundError, TodoRepository } from '../../../domain';

export class UpdateTodoItemUseCase {
  constructor(private todoRepository: TodoRepository) { }

  public async execute(input: UpdateTodoItemInput): Promise<UpdateTodoItemOutput> {
    const todo = await this.todoRepository.getById(input.todoId);
    if (!todo) {
      throw new TodoNotFoundError(input.todoId);
    }

    const itemToUpdate = todo.items.find((item) => item.id === input.todoItemId);
    if (!itemToUpdate) {
      throw new Error('Todo item not found');
    }

    itemToUpdate.updateContent(input.content);
    await this.todoRepository.update(todo);
  }
}

type UpdateTodoItemInput = {
  todoId: string;
  todoItemId: string;
  content: string;
  userId: string;
};

type UpdateTodoItemOutput = void;
