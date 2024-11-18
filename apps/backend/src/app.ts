
import 'dotenv/config';
import express from "express";
import * as admin from 'firebase-admin';
import errorHandler from './shared/infra/middlewares/error-handler.middleware';
import { router as todoRoutes } from './todo';
import { AddTodoItemUseCase, ChangeOrderTodoItemUseCase, CreateTodoUseCase, GetTodoUseCase, ShareTodoUseCase, UpdateTodoItemUseCase } from './todo/application';
import { TodoFirestoreRepository } from './todo/infra/repositories/firestore/todo-firestore.repository';
import { TodoController } from './todo/infra/web/todo.controller';

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS as string;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());

const todoRepository = new TodoFirestoreRepository();
const addTodoItemUseCase = new AddTodoItemUseCase(todoRepository);
const changeOrderTodoItemUseCase = new ChangeOrderTodoItemUseCase(todoRepository);
const createTodoUseCase = new CreateTodoUseCase(todoRepository);
const getTodoUseCase = new GetTodoUseCase(todoRepository);
const shareTodoUseCase = new ShareTodoUseCase(todoRepository);
const updateTodoItemUseCase = new UpdateTodoItemUseCase(todoRepository);
const todoController = new TodoController(
  addTodoItemUseCase,
  changeOrderTodoItemUseCase,
  createTodoUseCase,
  getTodoUseCase,
  shareTodoUseCase,
  updateTodoItemUseCase,
);
app.use("/todos", todoRoutes(todoController));

// Middleware de tratamento de erros
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
