import { FastifyReply, FastifyRequest } from "fastify";
import { TodoNotExists } from "src/use-cases/errors/todo-not-exists";
import { makeDeleteTodoUseCase } from "src/use-cases/factories/make-delete-todo-use-case";
import { z } from "zod";

export async function deleteTodo(request: FastifyRequest, reply: FastifyReply){

  const createTodoParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = createTodoParamsSchema.parse(request.params)

  try {
    const deleteTodoUseCase = makeDeleteTodoUseCase()


    const todo = await deleteTodoUseCase.execute({
      id,
      user_id: request.user.sub 
    })

  } catch (error) {

    if(error instanceof TodoNotExists) {
      return reply.status(409).send({message: error.message})
    }    
    
  }

  return reply.status(201).send() 
}