import { Repository } from '../../shared';
import { Todo } from './todo.entity';

export interface TodoRepository extends Repository<Todo> {
  getByUserAccess(ownerId: string, email: string): Promise<Todo[]>;
}
