import { InMemoryTodosRepository } from "@/repositories/in-memory/in-memory-todos-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetTodoByIdUseCase } from "./get-todo-by-id";
import { nextMonthDate } from "@/utils/next-month-date";
import { TodoNotExists } from "../errors/todo-not-exists";

let todoRepository: InMemoryTodosRepository
let sut: GetTodoByIdUseCase

describe('Suite test Get Todo', () => {
  beforeEach(() => {
    todoRepository = new InMemoryTodosRepository()
    sut = new GetTodoByIdUseCase(todoRepository)
  })

  it('Should be able to get a todo by id', async () => {
    const id = 'todo-01'
    const user_id = 'user-01'

    await todoRepository.create({
      id,
      subject: 'Todo to delete',
      expected_date: nextMonthDate(2, 10, 2024),
      user_id,
      checked: 0
    })

    await todoRepository.create({
      id: 'todo-deleted-02',
      subject: 'Todo to delete',
      expected_date: nextMonthDate(2, 10, 2024),
      user_id,
      checked: 0
    })   

    const todo = await sut.execute({id, user_id})

    expect(todo.id).toEqual(expect.any(String))
    expect(todo.id).toEqual(id)

  })

  it('Should not be able to get a todo by id if not exists', async () => {

    await todoRepository.create({
      id: 'todo-01',
      subject: 'Todo to delete',
      expected_date: nextMonthDate(2, 10, 2024),
      user_id: 'user-01',
      checked: 0
    })

    await expect(() => 
    sut.execute({id: 'non-existent-todo', user_id: 'user-01'})    
  ).rejects.toBeInstanceOf(TodoNotExists)

  })
})