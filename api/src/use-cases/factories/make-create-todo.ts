import { CreateTodoUseCase } from "../todo/create"
import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"

export function makeCreateTodoUseCase() {
  const userRepository = new PrismaTodosRepository()
  const useCase = new CreateTodoUseCase(userRepository)

  return useCase
}
