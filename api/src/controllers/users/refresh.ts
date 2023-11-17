import { env } from '@/env'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {  
  await request.jwtVerify()

  const token = await reply.jwtSign({
    name: env.NAME_TOKEN
  },{
    sign: {
      sub: request.user.sub,
      expiresIn: String(env.EXPIRES_IN_TOKEN)
    }
  })

  const refreshToken = await reply.jwtSign({
    name: env.NAME_REFRESH_TOKEN
  }, {
    sign: {
      sub: request.user.sub,
      expiresIn: String(env.EXPIRES_IN_REFRESH_TOKEN) 
    }
  })

  console.log('refrescando token')

  return reply
    .status(200)
    .send({
      tokenAccess: token,
      refreshToken
    })
}