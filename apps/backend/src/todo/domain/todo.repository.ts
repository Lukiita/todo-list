import { Repository } from '../../shared';
import { Todo } from './todo.entity';

export interface TodoRepository extends Repository<Todo> {
  getByOwnerId(ownerId: string): Promise<Todo[]>;
}
