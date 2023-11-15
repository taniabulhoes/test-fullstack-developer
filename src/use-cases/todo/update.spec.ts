import { InMemoryTodosRepository } from "@/repositories/in-memory/in-memory-todos-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateTodoUseCase } from "./update";
import { nextMonthDate } from "@/utils/next-month-date";
import { TodoNotExists } from "../errors/todo-not-exists";


//fazer testes aqui para qunado nao achar o todo

let todoRepository: InMemoryTodosRepository
let sut: UpdateTodoUseCase

describe('Suite Test Update Todo', () => {

  beforeEach(() => {
    todoRepository = new InMemoryTodosRepository()
    sut = new UpdateTodoUseCase(todoRepository)
  })

  it('Should be able to update a todo', async () => {
    const id = 'todo-01';
    const user = 'user-01';

    todoRepository.create({
      id,
      subject: 'Todo Created 1',
      expected_date: nextMonthDate(0, 1),
      user_id: user
    })

    todoRepository.create({
      id,
      subject: 'Todo Created 2',
      expected_date: nextMonthDate(10, 1),
      user_id: user
    })

    const {todo} = await sut.execute({
      id,
      subject: 'Todo Updated',
      expected_date: nextMonthDate(1, 10, 2024),
      user_id: 'user-01'
    })

    expect(todo.expected_date).toEqual(expect.any(Date))
    expect(todo.expected_date).toEqual(nextMonthDate(1, 10, 2024))
    expect(todo.subject).toEqual('Todo Updated')    
  })

  it('Should not be able to update a todo with same subject', async () => {

    await expect(() => 
      sut.execute({
        id: 'todo-01',
        subject: 'Todo same subject',
        expected_date: nextMonthDate(0, 10, 2024),
        user_id: 'user-01'
      })      
    ).rejects.toBeInstanceOf(TodoNotExists)
  })    
})