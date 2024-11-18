import { Router } from 'express';
import { TodoController } from './todo.controller';

export const router = (todoController: TodoController) => {
  const router = Router();

  // Usar a instância do controller
  router.post('/', (req, res, next) => todoController.create(req, res, next));
  router.get('/:todoId', (req, res, next) => todoController.getById(req, res, next));
  router.post('/:todoId/items', (req, res, next) => todoController.addItem(req, res, next));
  router.put('/:todoId/items/:itemId', (req, res, next) => todoController.updateItem(req, res, next));
  router.put('/:todoId/items/:itemId/order', (req, res, next) => todoController.changeOrderItem(req, res, next));
  router.put('/:todoId/share', (req, res, next) => todoController.share(req, res, next));
  return router;
};
