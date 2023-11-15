
import fastify from "fastify";
import { env } from "./env";
import { ZodError } from "zod";
import { error } from 'console'

export const app = fastify()


app.setErrorHandler((errr, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }


  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/Newrelic/Sentry
  }

  return reply.status(500).send({ messge: 'Internal server error.' })
})
