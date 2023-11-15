import { ITodoRepository } from "@/repositories/i-todo-repository";
import { TodoAlreadyExistsError } from "../errors/todo-already-exists";
import { TodoPastDateError } from "../errors/todo-past-date";
import { TodoNotExists } from "../errors/todo-not-exists";

interface DeleteTodoRequest {
  id: string;
  user_id: string;
}

class DeleteTodoUseCase{
  constructor(private todoRepository: ITodoRepository){
    this.todoRepository = todoRepository
  }
  
  async execute({id, user_id}: DeleteTodoRequest){

    const toDoAlredyExists = await this.todoRepository.findById(id)


    if(!toDoAlredyExists){
      throw new TodoNotExists()
    }

    const todo = await this.todoRepository.delete({
      id,
      user_id,
    })


  }
}

export {DeleteTodoUseCase}