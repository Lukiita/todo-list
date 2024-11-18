import { Todo } from '../../../domain';
import { TodoInMemoryRepository } from '../../../infra';
import { CreateTodoUseCase } from '../create-todo/create-todo.use-case';
import { ShareTodoUseCase } from './share-todo.use-case';


describe('CreateTodoListUseCase Tests', () => {
  let createTodoUseCase: CreateTodoUseCase;
  let shareTodoUseCase: ShareTodoUseCase;
  let todoInMemoryRepository: TodoInMemoryRepository;

  beforeEach(() => {
    todoInMemoryRepository = new TodoInMemoryRepository();
    createTodoUseCase = new CreateTodoUseCase(todoInMemoryRepository);
    shareTodoUseCase = new ShareTodoUseCase(todoInMemoryRepository);
  });

  it('should create a todo', async () => {
    const { todoId } = await createTodoUseCase.execute({
      title: 'Todo Title',
      userId: '123e4567-e89b-12d3-a456-426614174000',
    });

    await shareTodoUseCase.execute({
      emailToShare: 'user1@email.com',
      todoId,
      userId: '123e4567-e89b-12d3-a456-426614174000',
    });

    const todo = await todoInMemoryRepository.getById(todoId) as Todo;
    expect(todo.sharedWith.length).toBe(1);
    expect(todo.sharedWith[0]).toBe('user1@email.com');
  });
});
