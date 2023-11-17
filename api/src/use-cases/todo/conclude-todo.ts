import { ITodosRepository } from "@/repositories/i-todo-repository"
import { TodoAlreadyExistsError } from "../errors/todo-already-exists"
import { TodoNotExists } from "../errors/todo-not-exists"


interface ConcludeTaskTodoRequest{
  id: string
  user_id: string
}

class ConcludeTodoUseCase{
  constructor(private todoRepository: ITodosRepository){
    this.todoRepository = todoRepository
  }
  
  async execute({id, user_id}: ConcludeTaskTodoRequest): Promise<void>{

    const toDoExists = await this.todoRepository.findById(id)

    if(!toDoExists){
      throw new TodoNotExists()
    }

    await this.todoRepository.concludeTask(id, user_id) 

    return 
  }
}

export {ConcludeTodoUseCase}