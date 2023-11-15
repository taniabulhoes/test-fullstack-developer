import { FastifyInstance } from "fastify";
import { createUser } from "./create-user";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance){
  app.post('/sessions', authenticate)
  app.post('/users', createUser)
  app.patch('/token/refresh', refresh)

}