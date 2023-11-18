import { ITodosRepository, Todo } from "src/repositories/i-todo-repository"

interface MetricsTodoRequest {
  user_id: string,
}

type TodoUseCaseResponse = {
  total_conclude: number,
  total_todos: number  
}

class MetricsTodoUseCase {
  constructor(private todoRepository: ITodosRepository){
    this.todoRepository = todoRepository
  }

  async execute({user_id}: MetricsTodoRequest): Promise<TodoUseCaseResponse>{

    const todos = await this.todoRepository.metrics(user_id)

    return todos
  }
}

export {
  MetricsTodoUseCase
}