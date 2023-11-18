import { FastifyReply, FastifyRequest } from "fastify";
import { TodoNotExists } from "src/use-cases/errors/todo-not-exists";
import { TodoPastDateError } from "src/use-cases/errors/todo-past-date";
import { makeUpdateTodoUseCase } from "src/use-cases/factories/make-update-todo-use-case";
import { z } from "zod";

export async function updateTodo(request: FastifyRequest, reply: FastifyReply){

  const createTodoBodySchema = z.object({
    subject: z.string(),
    expected_date: z.string(),
  })

  const createTodoParamsSchema = z.object({
    id: z.string(),
  });

  const { subject, expected_date} = createTodoBodySchema.parse(request.body)

  const { id } = createTodoParamsSchema.parse(request.params)

  try {
    const updateTodoUseCase = makeUpdateTodoUseCase()

    const expectedDate = new Date(expected_date)

    await updateTodoUseCase.execute({
      id,
      subject,
      expected_date: expectedDate,
      user_id: request.user.sub
    })

  } catch (error) {
    if(error instanceof TodoPastDateError) {
      return reply.status(409).send({message: error.message})
    }    

    if(error instanceof TodoNotExists) {
      return reply.status(404).send({message: error.message})
    }    
    
  }

  return reply.status(201).send() 
}