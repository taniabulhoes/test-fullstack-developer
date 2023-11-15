import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"
import { ListTodoUseCase } from "../todo/list"

export function makeListTodoUseCase() {
  const userRepository = new PrismaTodosRepository()
  const useCase = new ListTodoUseCase(userRepository)

  return useCase
}
