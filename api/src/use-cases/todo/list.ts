import { ITodosRepository, Todo } from "src/repositories/i-todo-repository"

interface ListTodoRequest {
  userId: string,
  query?: string
}

type TodoUseCaseResponse = Todo[]

class ListTodoUseCase {
  constructor(private todoRepository: ITodosRepository){
    this.todoRepository = todoRepository
  }

  async execute({userId, query}: ListTodoRequest): Promise<TodoUseCaseResponse>{

    const todos = await this.todoRepository.list(userId, query)

    return todos
  }
}

export {
  ListTodoUseCase
}