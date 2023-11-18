import { TodoNotExists } from "@/use-cases/errors/todo-not-exists";
import { makeGeteTodoUseCase } from "@/use-cases/factories/make-get-todo-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { TodoPastDateError } from "src/use-cases/errors/todo-past-date";
import { z } from "zod";

export async function getTodoById(request: FastifyRequest, reply: FastifyReply){
  try {

    const getTodoByIdParamsSchema = z.object({
      id: z.string(),
    });
  
    const { id } = getTodoByIdParamsSchema.parse(request.params)
  
    const getTodoByIdTodoUseCase = makeGeteTodoUseCase()

    const todo = await getTodoByIdTodoUseCase.execute({
      id,
      user_id: request.user.sub
    })

    return reply.status(201).send({
      todo      
    }) 
  } catch (error) {
    if(error instanceof TodoNotExists) {
      return reply.status(404).send({message: error.message})
    }    
  }

  return reply.status(201).send() 
}