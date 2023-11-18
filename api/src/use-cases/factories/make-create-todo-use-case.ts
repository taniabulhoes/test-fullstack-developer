import { CreateTodoUseCase } from "../todo/create"
import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"

export function makeCreateTodoUseCase() {
  const todoRepository = new PrismaTodosRepository()
  const useCase = new CreateTodoUseCase(todoRepository)

  return useCase
}
