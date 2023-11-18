import { PrismaTodosRepository } from "src/repositories/prisma/prisma-todos-repository"
import { ListTodoUseCase } from "../todo/list"

export function makeListTodoUseCase() {
  const todoRepository = new PrismaTodosRepository()
  const useCase = new ListTodoUseCase(todoRepository)

  return useCase
}
