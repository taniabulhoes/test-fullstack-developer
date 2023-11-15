import { FastifyReply, FastifyRequest } from "fastify";
import { TodoAlreadyExistsError } from "src/use-cases/errors/todo-already-exists";
import { TodoPastDateError } from "src/use-cases/errors/todo-past-date";
import { UserAlreadyExistsError } from "src/use-cases/errors/user-already-exists";
import { makeCreateTodoUseCase } from "src/use-cases/factories/make-create-todo";
import { makeCreateUserUseCase } from "src/use-cases/factories/make-create-user";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply){
  const createTodoBodySchema = z.object({
    subject: z.string(),
    expected_date: z.string(),
  })

  const { subject, expected_date} = createTodoBodySchema.parse(request.body)

  try {
    const createTodoUseCase = makeCreateTodoUseCase()

    const expectedDate = new Date(expected_date)

    const todo = await createTodoUseCase.execute({
      subject,
      expected_date: expectedDate,
      user_id: '604150e2-5e79-48f6-a2d8-99c3823d909b' //alterar 
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