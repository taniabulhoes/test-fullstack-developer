import { InMemoryTodosRepository } from "@/repositories/in-memory/in-memory-todos-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { DeleteTodoUseCase } from "./delete";
import { nextMonthDate } from "@/utils/next-month-date";
import { TodoNotExists } from "../errors/todo-not-exists";

let todoRepository: InMemoryTodosRepository
let sut: DeleteTodoUseCase

describe('Suite test delete Todo ', () => {
  beforeEach(() => {
    todoRepository = new InMemoryTodosRepository()
    sut = new DeleteTodoUseCase(todoRepository)
  })

  it('Should be able to delete a todo', async() => {
    const id = 'todo-deleted-01'
    const user_id = "user-01"

    await todoRepository.create({
      id,
      subject: 'Todo to delete',
      expected_date: nextMonthDate(2, 10, 2024),
      user_id
    })

    await todoRepository.create({
      id: 'todo-deleted-02',
      subject: 'Todo to delete',
      expected_date: nextMonthDate(2, 10, 2024),
      user_id
    })    

    await sut.execute({id, user_id})

    const list = await todoRepository.list(user_id, 1)

    expect(list).toEqual([
      expect.objectContaining({ id: 'todo-deleted-02' }),
    ])
  })

  it('Should not be able to delete a todo with not existing', async () => {

    await expect(() => 
      sut.execute({id: 'todo-01', user_id: 'user-01'})    
    ).rejects.toBeInstanceOf(TodoNotExists)
  })
})