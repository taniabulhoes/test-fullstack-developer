import { ConcludeTodoUseCase } from "../todo/conclude-todo"
import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"

export function makeConcludeTodoUseCase() {
  const todoRepository = new PrismaTodosRepository()
  const useCase = new ConcludeTodoUseCase(todoRepository)

  return useCase
}
