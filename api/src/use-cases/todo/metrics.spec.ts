import { InMemoryTodosRepository } from "@/repositories/in-memory/in-memory-todos-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { MetricsTodoUseCase } from "./metrics";
import { nextMonthDate } from "@/utils/next-month-date";
import { object } from "zod";

let todoRepository: InMemoryTodosRepository
let sut: MetricsTodoUseCase
describe('Suite test metrics', () => {
  beforeEach(() => {
    todoRepository = new InMemoryTodosRepository()
    sut = new MetricsTodoUseCase(todoRepository)
  })

  it('Should be able to show metrics by user', async () => {
    const user = 'user-01'

    await todoRepository.create({
      id: 'todo-01',
      subject: 'Todo 01',
      expected_date: nextMonthDate(0, 1, 2024),
      user_id: user,
      checked: 0
    })

    await todoRepository.create({
      id: 'todo-02',
      subject: 'Todo 01',
      expected_date: nextMonthDate(0, 1, 2024),
      user_id: user,
      checked: 0
    })    

    await todoRepository.create({
      id: 'todo-03',
      subject: 'Todo 01',
      expected_date: nextMonthDate(0, 1, 2024),
      user_id: user,
      checked: 1
    })        


    const metrics = await sut.execute({user_id: user})

    expect(metrics).toEqual(
      expect.objectContaining({ total_todos: 3,  total_conclude: 1}),
    )

  })
})