import { TodoNotFoundError, TodoRepository } from '../../../domain';

export class ChangeOrderTodoItemUseCase {
  constructor(private todoRepository: TodoRepository) { }

  public async execute(input: ChangeOrderTaskInput): Promise<ChangeOrderTaskOutput> {
    const todo = await this.todoRepository.getById(input.todoId);
    if (!todo) {
      throw new TodoNotFoundError(input.todoId);
    }

    const itemToMove = todo.items.find((item) => item.id === input.todoItemId);
    if (!itemToMove) {
      throw new Error('Todo item not found');
    }

    const originalOrder = itemToMove.order;
    itemToMove.updateOrder(input.newOrder);

    for (const item of todo.items) {
      if (item.id !== itemToMove.id) {
        const inferiorLimit = Math.min(originalOrder, input.newOrder);
        const superiorLimit = Math.max(originalOrder, input.newOrder);
        const isBetween = item.order >= inferiorLimit && item.order < superiorLimit;
        if (isBetween) {
          item.updateOrder(originalOrder < input.newOrder ? item.order - 1 : item.order + 1);
        }
      }
    }

    await this.todoRepository.update(todo);
  }
}

type ChangeOrderTaskInput = {
  todoId: string;
  todoItemId: string;
  userId: string;
  newOrder: number;
};

type ChangeOrderTaskOutput = void;