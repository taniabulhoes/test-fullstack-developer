import { TodoAlreadyExistsError } from "../errors/todo-already-exists";
import { TodoPastDateError } from "../errors/todo-past-date";
import { TodoNotExists } from "../errors/todo-not-exists";
import { ITodosRepository } from "src/repositories/i-todo-repository";

interface DeleteTodoRequest {
  id: string;
  user_id: string;
}

class DeleteTodoUseCase{
  constructor(private todoRepository: ITodosRepository){
    this.todoRepository = todoRepository
  }
  
  async execute({id, user_id}: DeleteTodoRequest): Promise<null>{
    const toDoAlredyExists = await this.todoRepository.findById(id)

    if(!toDoAlredyExists){
      throw new TodoNotExists()
    }

    const todo = await this.todoRepository.delete({
      id,
      user_id,
    })

    return null
  }
}

export {DeleteTodoUseCase}