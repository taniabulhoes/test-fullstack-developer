import { beforeEach, describe, expect, it } from "vitest";
import { ListTodoUseCase } from "./list";
import { InMemoryTodosRepository } from "../../repositories/in-memory/in-memory-todos-repository";
import { nextMonthDate } from "../../utils/next-month-date";


let todoRepository: InMemoryTodosRepository
let sut: ListTodoUseCase

describe('Suite Test List Todos', () => {
  beforeEach(() => {
    todoRepository = new InMemoryTodosRepository()
    sut = new ListTodoUseCase(todoRepository)
  })

  it('Should be able to list a todos', async () => {
    const user = 'user-01'

    for (let i = 1; i < 12; i++) {
      await todoRepository.create({
        id: `todo-${i}`,
        subject: `Todo ${i}`,
        expected_date: nextMonthDate(2, i, 2024),
        user_id: user
      })
    }

    const todos = await sut.execute({userId: user, query: 'Todo 1'})

    expect(todos).toHaveLength(3)
  })
})