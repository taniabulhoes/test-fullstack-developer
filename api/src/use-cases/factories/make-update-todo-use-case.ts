import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"
import { UpdateTodoUseCase } from "../todo/update"

export function makeUpdateTodoUseCase() {
  const todoRepository = new PrismaTodosRepository()
  const useCase = new UpdateTodoUseCase(todoRepository)

  return useCase
}
