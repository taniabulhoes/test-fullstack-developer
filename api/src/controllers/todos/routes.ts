import { FastifyInstance } from "fastify";
import { create } from "./create-todo";
import { updateTodo } from "./update-todo";
import { listTodos } from "./list-todo";
import { deleteTodo } from "./delete-todo";
import { verifyJwt } from "src/middlewares/verify-jwt";
import { conclude } from "./conclude-todo";
import { getTodoById } from "./get-todo-by-id";
import { metrics } from "./metricis";

export async function todosRoutes(app: FastifyInstance){
  app.addHook('onRequest', verifyJwt)
  
  app.get('/todos/todo/:id', getTodoById)
  app.get('/todos', listTodos)
  app.get('/todos/metrics', metrics)
  app.post('/todos', create)
  app.put('/todos/:id', updateTodo)
  app.patch('/todos/conclude/:id', conclude)
  app.delete('/todos/:id', deleteTodo)
}