import { FastifyReply, FastifyRequest } from "fastify";
import { TodoAlreadyExistsError } from "src/use-cases/errors/todo-already-exists";
import { TodoPastDateError } from "src/use-cases/errors/todo-past-date";
import { makeCreateTodoUseCase } from "src/use-cases/factories/make-create-todo-use-case";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply){
  await request.jwtVerify()
 
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