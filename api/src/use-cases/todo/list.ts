import { ITodosRepository, Todo } from "src/repositories/i-todo-repository"

interface ListTodoRequest {
  user_id: string,
  query?: string
}

type TodoUseCaseResponse = Todo[]

class ListTodoUseCase {
  constructor(private todoRepository: ITodosRepository){
    this.todoRepository = todoRepository
  }

  async execute({user_id, query}: ListTodoRequest): Promise<TodoUseCaseResponse>{

    const todos = await this.todoRepository.list(user_id, query)

    return todos
  }
}

export {
  ListTodoUseCase
}