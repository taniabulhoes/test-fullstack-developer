import { FastifyReply, FastifyRequest } from "fastify";
import { TodoAlreadyExistsError } from "src/use-cases/errors/todo-already-exists";
import { TodoPastDateError } from "src/use-cases/errors/todo-past-date";
import { UserAlreadyExistsError } from "src/use-cases/errors/user-already-exists";
import { makeCreateTodoUseCase } from "src/use-cases/factories/make-create-todo";
import { makeCreateUserUseCase } from "src/use-cases/factories/make-create-user";
import { makeListTodoUseCase } from "src/use-cases/factories/make-list-todo";
import { z } from "zod";

export async function listTodos(request: FastifyRequest, reply: FastifyReply){

  const listTodosQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = listTodosQuerySchema.parse(request.query)

  const listUseCase = makeListTodoUseCase()

  const todo = await listUseCase.execute({
    query: q,
    page,
    userId: '604150e2-5e79-48f6-a2d8-99c3823d909b'
  })

  return reply.status(201).send({
    todo,
  }) 

}