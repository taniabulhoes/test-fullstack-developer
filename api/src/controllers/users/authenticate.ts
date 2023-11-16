import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "src/env";
import { UserAlreadyExistsError } from "src/use-cases/errors/user-already-exists";
import { InvalidCredentialsError } from "src/use-cases/errors/user-invalid-credential";
import { makeAuthenticateUseCase } from "src/use-cases/factories/make-authenticate-use-case";
import { makeCreateUserUseCase } from "src/use-cases/factories/make-create-user-use-case";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply){
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)
  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '2m'
        },
      },
    )    

    const refreshToken = await reply.jwtSign(
      {
        sign: {
          sub: user.id,
          expiresIn: '20m',
        },
      },
    )
        
    return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(201)
    .send({
      token, user: { ...user, password_hash: undefined, created_at: undefined }
    }) 

  } catch (error) {
    if(error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }    
  }

}