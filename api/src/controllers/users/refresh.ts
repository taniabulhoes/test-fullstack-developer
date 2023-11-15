import { FastifyReply, FastifyRequest } from 'fastify'
import { env } from 'src/env'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {

  await request.jwtVerify({ onlyCookie: true })

  console.log('sadsad')

  const token = await reply.jwtSign(
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  console.log(token)

  const refreshToken = await reply.jwtSign(
    {
      sign: {
        sub: request.user.sub,
        expiresIn: env.EXPERES_IN_REFRESH_TOKEN,
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
    .status(200)
    .send({
      token,
    })
}