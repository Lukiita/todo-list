
import { getFirestore } from 'firebase-admin/firestore';
import { Todo, TodoItemProps, TodoProps, TodoRepository } from '../../../domain';
import { TodoFirestoreMapper } from './todo-firestore.mapper';

export class TodoFirestoreRepository implements TodoRepository {
  private readonly collectionName = 'todos';
  private readonly subCollectionName = 'items';
  private db: FirebaseFirestore.Firestore;
  private todoFirestoreMapper: TodoFirestoreMapper;

  constructor() {
    this.todoFirestoreMapper = new TodoFirestoreMapper();
    this.db = getFirestore();
  }

  private get collection() {
    return this.db.collection(this.collectionName);
  }

  private getSubCollection(todoId: string) {
    return this.collection.doc(todoId).collection(this.subCollectionName);
  }

  public async create(entity: Todo): Promise<void> {
    try {
      this.db.runTransaction(async (transaction) => {
        const todoDoc = this.collection.doc(entity.id);
        const { items, ...otherProps } = this.todoFirestoreMapper.fromEntity(entity);
        transaction.set(todoDoc, otherProps);
        const itemsCollection = this.getSubCollection(todoDoc.id);
        items.forEach(async (item) => {
          const itemDoc = itemsCollection.doc(item.id);
          transaction.set(itemDoc, item);
        });
      });
    } catch (error) {
      console.error('Error creating todo', error);
      throw error;
    }

  }

  public async getByOwnerId(ownerId: string): Promise<Todo[]> {
    try {
      const snapshot = await this.collection
        .where('ownerId', '==', ownerId)
        .orderBy('createdAt', 'desc')
        .get();

      const todos: Todo[] = [];
      for (const doc of snapshot.docs) {
        const todo = doc.data() as TodoProps;
        const todoItems = await this.getSubCollection(doc.id).get();
        const items = todoItems.docs.map((item) => item.data() as TodoItemProps);
        todos.push(this.todoFirestoreMapper.toEntity(todo, items));
      }

      return todos;
    } catch (error) {
      console.error('Error getting todos by owner id', error);
      throw error;
    }
  }

  public async update(entity: Todo): Promise<void> {
    try {
      this.db.runTransaction(async (transaction) => {
        const todoDoc = this.collection.doc(entity.id);
        const { items, ...otherProps } = this.todoFirestoreMapper.fromEntity(entity);
        transaction.update(todoDoc, otherProps);
        const itemsCollection = this.getSubCollection(todoDoc.id);
        items.forEach(async (item) => {
          const itemDoc = itemsCollection.doc(item.id);
          transaction.set(itemDoc, item);
        });
      });
    } catch (error) {
      console.error('Error updating todo', error);
      throw error;
    }
  }

  public async getById(id: string): Promise<Todo | null> {
    const todoDoc = await this.collection.doc(id).get();
    if (!todoDoc.exists) {
      return null;
    }

    const todo = todoDoc.data() as TodoProps;
    const todoItems = await this.getSubCollection(todoDoc.id).get();
    const items = todoItems.docs.map((item) => item.data() as TodoItemProps);
    return this.todoFirestoreMapper.toEntity(todo, items);
  }
}
