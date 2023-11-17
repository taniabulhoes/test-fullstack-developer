import { FastifyReply, FastifyRequest } from "fastify";
import { makeListTodoUseCase } from "src/use-cases/factories/make-list-todo-use-case";
import { z } from "zod";

export async function listTodos(request: FastifyRequest, reply: FastifyReply){

  const listTodosQuerySchema = z.object({
    q: z.string(),
  })

  const { q } = listTodosQuerySchema.parse(request.query)

  const listUseCase = makeListTodoUseCase()

  const todo = await listUseCase.execute({
    query: q,
    userId: request.user.sub
  })

  return reply.status(201).send({
    todo,
  }) 

}