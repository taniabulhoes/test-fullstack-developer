import { FastifyReply, FastifyRequest } from "fastify";
import { makeListTodoUseCase } from "src/use-cases/factories/make-list-todo-use-case";
import { z } from "zod";

export async function listTodos(request: FastifyRequest, reply: FastifyReply){
  await request.jwtVerify()

  const listTodosQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = listTodosQuerySchema.parse(request.query)

  const listUseCase = makeListTodoUseCase()

  const todo = await listUseCase.execute({
    query: q,
    page,
    userId: request.user.sub
  })

  return reply.status(201).send({
    todo,
  }) 

}