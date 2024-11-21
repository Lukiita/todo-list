import { InMemoryRepository } from '../../../../shared';
import { Todo, TodoRepository } from '../../../domain';

export class TodoInMemoryRepository extends InMemoryRepository<Todo> implements TodoRepository {
  public async getByUserAccess(ownerId: string, email: string): Promise<Todo[]> {
    return this.entities.filter((todo) => todo.ownerId === ownerId || todo.sharedWith.includes(email));
  }
}
