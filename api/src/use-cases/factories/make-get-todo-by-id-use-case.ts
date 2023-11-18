import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"
import { GetTodoByIdUseCase } from "../todo/get-todo-by-id"

export function makeGeteTodoUseCase() {
  const todoRepository = new PrismaTodosRepository()
  const useCase = new GetTodoByIdUseCase(todoRepository)

  return useCase
}
