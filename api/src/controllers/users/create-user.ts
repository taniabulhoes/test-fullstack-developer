import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "src/use-cases/errors/user-already-exists";
import { makeCreateUserUseCase } from "src/use-cases/factories/make-create-user-use-case";
import { z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply){
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password} = createUserBodySchema.parse(request.body)
  try {
    const userUseCase = makeCreateUserUseCase()

    const teste = await userUseCase.execute({
      name,
      email,
      password
    })

  } catch (error) {

    if(error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }    
  }

  return reply.status(201).send() 
}