import { FastifyInstance } from "fastify";
import { create } from "./create-todo";
import { updateTodo } from "./update-todo";
import { listTodos } from "./list-todo";
import { deleteTodo } from "./delete-todo";
import { verifyJWT } from "src/middlewares/verify-jwt";

export async function todosRoutes(app: FastifyInstance){
  app.addHook('onRequest', verifyJWT)

  app.get('/todos', listTodos)
  app.post('/todos', create)
  app.put('/todos/:id', updateTodo)
  app.delete('/todos/:id', deleteTodo)
}