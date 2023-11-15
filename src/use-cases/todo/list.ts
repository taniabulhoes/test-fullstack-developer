import { ITodoRepository } from "@/repositories/i-todo-repository";

interface ListTodoRequest {
  userId: string,
  page: number,
  query?: string
}

class ListTodoUseCase {
  constructor(private todoRepository: ITodoRepository){
    this.todoRepository = todoRepository
  }

  async execute({userId, page, query}: ListTodoRequest){

    const todos = await this.todoRepository.list(userId, page, query)

    return todos
  }
}

export {
  ListTodoUseCase
}