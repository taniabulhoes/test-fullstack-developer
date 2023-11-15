import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"
import { DeleteTodoUseCase } from "../todo/delete"

export function makeDeleteTodoUseCase() {
  const todoRepository = new PrismaTodosRepository()
  const useCase = new DeleteTodoUseCase(todoRepository)

  return useCase
}
