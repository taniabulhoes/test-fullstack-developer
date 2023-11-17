import { makeConcludeTodoUseCase } from "@/use-cases/factories/make-conclude-todo-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { TodoAlreadyExistsError } from "src/use-cases/errors/todo-already-exists";
import { TodoPastDateError } from "src/use-cases/errors/todo-past-date";
import { makeCreateTodoUseCase } from "src/use-cases/factories/make-create-todo-use-case";
import { z } from "zod";

export async function conclude(request: FastifyRequest, reply: FastifyReply){
  try {

    const concludeTodoParamsSchema = z.object({
      id: z.string(),
    });
  
    const { id } = concludeTodoParamsSchema.parse(request.params)
  

    const concludeTodoUseCase = makeConcludeTodoUseCase()

    const todo = await concludeTodoUseCase.execute({
      id,
      user_id: request.user.sub
    })

  } catch (error) {

    if(error instanceof TodoAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }    

    if(error instanceof TodoPastDateError) {
      return reply.status(409).send({message: error.message})
    }    
  }

  return reply.status(201).send() 
}