
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodError } from "zod";
import { env } from "./env";
import { usersRoutes } from "./controllers/users/routes";
import { todosRoutes } from "./controllers/todos/routes";

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed:false
  },
  sign: {
    expiresIn: env.EXPIRES_IN_TOKEN
  }
})


app.register(fastifyCookie)

app.register(usersRoutes)
app.register(todosRoutes)

app.setErrorHandler((error, _, reply) => {

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if(error.code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED'){
    return reply
    .status(400)
    .send({ message: 'Refresh token inválido' })
  }


  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/Newrelic/Sentry
  }

  return reply.status(500).send({ messge: 'Internal server error.' })
})

