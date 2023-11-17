import { InMemoryTodosRepository } from "@/repositories/in-memory/in-memory-todos-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ConcludeTodoUseCase } from "./conclude-todo";
import { nextMonthDate } from "@/utils/next-month-date";

let todoRepository: InMemoryTodosRepository
let sut: ConcludeTodoUseCase

describe('Suite test complete task', () => {

  beforeEach(() => {
    todoRepository = new InMemoryTodosRepository()
    sut = new ConcludeTodoUseCase(todoRepository)
  })

  it('Should be able to complete a task', async () => {
    const id = 'todo-01'
    const user_id = 'user-01'

    await todoRepository.create({
      id,
      subject: 'First Todo',
      expected_date: nextMonthDate(0, 1, 2024),
      user_id,
    })

    await sut.execute({id, user_id})

    const list = await todoRepository.list(user_id)

    expect(list).toEqual([
      expect.objectContaining({ checked: 1 }),
    ])

  })
})