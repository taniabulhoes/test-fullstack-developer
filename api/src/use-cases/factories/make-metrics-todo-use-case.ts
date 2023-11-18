import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"
import { MetricsTodoUseCase } from "../todo/metrics"

export function makeMetricsTodoUseCase() {
  const todoRepository = new PrismaTodosRepository()
  const useCase = new MetricsTodoUseCase(todoRepository)

  return useCase
}
