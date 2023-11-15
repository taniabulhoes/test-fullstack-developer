import { ITodoRepository } from "@/repositories/i-todo-repository";
import { TodoAlreadyExistsError } from "../errors/todo-already-exists";
import { TodoPastDateError } from "../errors/todo-past-date";
import { TodoNotExists } from "../errors/todo-not-exists";

interface UpdateTodoRequest {
  id: string;
  subject: string;
  expected_date: Date;
  user_id: string;
}

class UpdateTodoUseCase{
  constructor(private todoRepository: ITodoRepository){
    this.todoRepository = todoRepository
  }
  
  async execute({id, subject, expected_date, user_id}: UpdateTodoRequest){

    const todoNotExists = await this.todoRepository.findById(id)

    if(!todoNotExists){
      throw new TodoNotExists
    }

    const dateNow = new Date()

    if(dateNow > expected_date){
      throw new TodoPastDateError
    }

    const todo = await this.todoRepository.update({
      id,
      subject,
      expected_date,
      user_id,
    }) 

    return {
      todo
    }
  }
}

export {UpdateTodoUseCase}