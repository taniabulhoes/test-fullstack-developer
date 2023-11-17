import { env } from "@/env";
import { FastifyReply, FastifyRequest, fastify } from "fastify";
import { InvalidCredentialsError } from "src/use-cases/errors/user-invalid-credential";
import { makeAuthenticateUseCase } from "src/use-cases/factories/make-authenticate-use-case";
import { z } from "zod";

const EXPIRES_IN = 1000 * 60 * 60 * 24 * 1  //1d

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

    const token = await reply.jwtSign({
      name: env.NAME_TOKEN,
    },{
      sign: {
        sub: user.id,
        expiresIn: String(env.EXPIRES_IN_TOKEN) 
      }
    })
  
    const refreshToken = await reply.jwtSign({
      name: env.NAME_REFRESH_TOKEN
    }, {
      sign: {
        sub: user.id,
        expiresIn: String(env.EXPIRES_IN_REFRESH_TOKEN)    
      }
    })
      
    var data = new Date()
    data.setMinutes(data.getMinutes() + EXPIRES_IN);    

    const expireToken = data.getTime()

    return reply
    .status(200)
    .send({
      tokenAccess: token, 
      refreshToken,
      expiresIn: expireToken, 
      user: { ...user, password_hash: undefined, created_at: undefined }
    }) 

  } catch (error) {
    if(error instanceof InvalidCredentialsError) {
      return reply.status(400).send({message: error.message})
    }    
  }

}