import { ITodosRepository, Todo } from "src/repositories/i-todo-repository"
import { TodoNotExists } from "../errors/todo-not-exists"

interface ListTodoRequest {
  id: string,
  user_id: string,
}

type TodoUseCaseResponse = Todo

class GetTodoByIdUseCase {
  constructor(private todoRepository: ITodosRepository){
    this.todoRepository = todoRepository
  }

  async execute({id, user_id}: ListTodoRequest): Promise<TodoUseCaseResponse>{

    const todo = await this.todoRepository.findById(id)

    if(!todo){
      throw new TodoNotExists()
    }

    return todo
  }
}

export {
  GetTodoByIdUseCase
}