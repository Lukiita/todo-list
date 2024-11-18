import { InMemoryRepository } from '../../../../shared';
import { Todo, TodoRepository } from '../../../domain';

export class TodoInMemoryRepository extends InMemoryRepository<Todo> implements TodoRepository {
  public async getByOwnerId(ownerId: string): Promise<Todo[]> {
    return this.entities.filter((todo) => todo.ownerId === ownerId);
  }
}
