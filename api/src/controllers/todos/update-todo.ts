import { FastifyReply, FastifyRequest } from "fastify";
import { TodoAlreadyExistsError } from "src/use-cases/errors/todo-already-exists";
import { TodoNotExists } from "src/use-cases/errors/todo-not-exists";
import { TodoPastDateError } from "src/use-cases/errors/todo-past-date";
import { makeCreateTodoUseCase } from "src/use-cases/factories/make-create-todo";
import { makeUpdateTodoUseCase } from "src/use-cases/factories/make-update-todo";
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

    const todo = await updateTodoUseCase.execute({
      id,
      subject,
      expected_date: expectedDate,
      user_id: '604150e2-5e79-48f6-a2d8-99c3823d909b' //alterar 
    })

  } catch (error) {
    if(error instanceof TodoPastDateError) {
      return reply.status(409).send({message: error.message})
    }    

    if(error instanceof TodoNotExists) {
      return reply.status(409).send({message: error.message})
    }    
    
  }

  return reply.status(201).send() 
}