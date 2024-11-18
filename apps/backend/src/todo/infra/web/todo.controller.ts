import { NextFunction, Request, Response } from 'express';
import { AddTodoItemUseCase, ChangeOrderTodoItemUseCase, CreateTodoUseCase, GetTodoUseCase, ShareTodoUseCase, UpdateTodoItemUseCase } from '../../application';
export class TodoController {
  constructor(
    private readonly addTodoItemUseCase: AddTodoItemUseCase,
    private readonly changeOrderTodoItemUseCase: ChangeOrderTodoItemUseCase,
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly getTodoUseCase: GetTodoUseCase,
    private readonly shareTodoUseCase: ShareTodoUseCase,
    private readonly updateTodoItemUseCase: UpdateTodoItemUseCase,
  ) { }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createTodoOutput = await this.createTodoUseCase.execute({
        title: req.body.title,
        userId: req.body.userId,
      });

      res.status(201).send(createTodoOutput);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await this.getTodoUseCase.execute({ todoId: req.params.todoId });

      res.status(200).send(todo);
    } catch (error) {
      next(error);
    }
  }

  async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      await this.addTodoItemUseCase.execute({
        todoId: req.params.todoId,
        content: req.body.content,
        userId: req.body.userId,
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      await this.updateTodoItemUseCase.execute({
        todoId: req.params.todoId,
        todoItemId: req.params.itemId,
        content: req.body.content,
        userId: req.body.userId,
      });

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  async changeOrderItem(req: Request, res: Response, next: NextFunction) {
    try {
      await this.changeOrderTodoItemUseCase.execute({
        todoId: req.params.todoId,
        todoItemId: req.params.itemId,
        newOrder: req.body.newOrder,
        userId: req.body.userId,
      });

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  async share(req: Request, res: Response, next: NextFunction) {
    try {
      await this.shareTodoUseCase.execute({
        todoId: req.params.todoId,
        userId: req.body.userId,
        emailToShare: req.body.email,
      });

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
