import { InMemoryTodosRepository } from "@/repositories/in-memory/in-memory-todos-repository";
import { describe, it, beforeEach, expect } from "vitest";
import { CreateTodoUseCase } from "./create";
import { TodoAlreadyExistsError } from "../errors/todo-already-exists";
import { TodoPastDateError } from "../errors/todo-past-date";
import { nextMonthDate } from "@/utils/next-month-date";

let todoRepository: InMemoryTodosRepository
let sut: CreateTodoUseCase

describe('Suite Test Create Todo', () => {
  beforeEach(() => {
    todoRepository = new InMemoryTodosRepository()
    sut = new CreateTodoUseCase(todoRepository)
  })

  it('Should be able to create a todo',  async () => {
    const {todo} = await sut.execute({
      subject: 'First Todo',
      expected_date: new Date(2024, 0, 1),
      user_id: 'user-01'
    })

    expect(todo.id).toEqual(expect.any(String))
    expect(todo.expected_date).toEqual(new Date(2024, 0, 1))
  })

  it('Should not be able to create a todo with same subject', async () => {
    const subject = 'The same todo'
    const user = 'user-01'

    await sut.execute({
      subject,
      expected_date: nextMonthDate(0, 1, 2024),
      user_id: user
    })
    
    await expect(() => {
      return sut.execute({
        subject,
        expected_date: nextMonthDate(0, 1, 2024),
        user_id: user
      })      
    }).rejects.toBeInstanceOf(TodoAlreadyExistsError)
  })

  it('Should not be able to create a todo with past date', async () => {
        
    await expect(() => {
      return sut.execute({
        subject: 'Todo with past date',
        expected_date:  nextMonthDate(0, 1, 2023),
        user_id: 'user-01'
      })      
    }).rejects.toBeInstanceOf(TodoPastDateError)
  })  
})