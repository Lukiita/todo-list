import { TodoInMemoryRepository } from '../../../infra';
import { CreateTodoUseCase } from '../create-todo/create-todo.use-case';
import { GetTodoUseCase } from './get-todo.use-case';

describe('CreateTodoListUseCase Tests', () => {
  let createTodoUseCase: CreateTodoUseCase;
  let getTodoUseCase: GetTodoUseCase;
  let todoInMemoryRepository: TodoInMemoryRepository;

  beforeEach(() => {
    todoInMemoryRepository = new TodoInMemoryRepository();
    createTodoUseCase = new CreateTodoUseCase(todoInMemoryRepository);
    getTodoUseCase = new GetTodoUseCase(todoInMemoryRepository);
  });

  it('should create a todo', async () => {
    const { todoId } = await createTodoUseCase.execute({
      title: 'Todo Title',
      userId: '123e4567-e89b-12d3-a456-426614174000',
    });

    const todo = await getTodoUseCase.execute({ todoId });
    expect(todo).toBeDefined();
    expect(todo).toEqual({
      id: todo.id,
      items: [],
      title: 'Todo Title',
      ownerId: '123e4567-e89b-12d3-a456-426614174000',
      sharedWith: [],
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    });
  });
});
