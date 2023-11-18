import { makeMetricsTodoUseCase } from "@/use-cases/factories/make-metrics-todo-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeListTodoUseCase } from "src/use-cases/factories/make-list-todo-use-case";
import { z } from "zod";

export async function metrics(request: FastifyRequest, reply: FastifyReply){

  const metricUseCase = makeMetricsTodoUseCase()

  const metrics = await metricUseCase.execute({
    user_id: request.user.sub
  })

  return reply.status(201).send({
    metrics,
  }) 

}