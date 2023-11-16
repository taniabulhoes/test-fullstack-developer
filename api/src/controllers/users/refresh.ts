import { env } from '@/env'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {  
  await request.jwtVerify({ onlyCookie: true })
  
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

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}