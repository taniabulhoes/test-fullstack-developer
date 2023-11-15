import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"
import { DeleteTodoUseCase } from "../todo/delete"

export function makeDeleteTodoUseCase() {
  const userRepository = new PrismaTodosRepository()
  const useCase = new DeleteTodoUseCase(userRepository)

  return useCase
}
