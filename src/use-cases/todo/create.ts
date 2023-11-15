import { ITodoRepository } from "@/repositories/i-todo-repository";
import { TodoAlreadyExistsError } from "../errors/todo-already-exists";
import { TodoPastDateError } from "../errors/todo-past-date";

interface CreateTodoRequest {
  subject: string;
  expected_date: Date;
  user_id: string
}

class CreateTodoUseCase{
  constructor(private todoRepository: ITodoRepository){
    this.todoRepository = todoRepository
  }
  
  async execute({subject, expected_date, user_id}: CreateTodoRequest){

    const toDoAlredyExists = await this.todoRepository.findBySubject(subject)

    if(toDoAlredyExists){
      throw new TodoAlreadyExistsError
    }

    const dateNow = new Date()

    if(dateNow > expected_date){
      throw new TodoPastDateError
    }

    const todo = await this.todoRepository.create({
      subject,
      expected_date,
      user_id,
    }) 

    return {
      todo
    }
  }
}

export {CreateTodoUseCase}