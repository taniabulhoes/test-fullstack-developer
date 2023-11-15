import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"
import { UpdateTodoUseCase } from "../todo/update"

export function makeUpdateTodoUseCase() {
  const userRepository = new PrismaTodosRepository()
  const useCase = new UpdateTodoUseCase(userRepository)

  return useCase
}
