import { TodoAlreadyExistsError } from "../errors/todo-already-exists";
import { TodoPastDateError } from "../errors/todo-past-date";
import { TodoNotExists } from "../errors/todo-not-exists";
import { ITodosRepository, Todo } from "src/repositories/i-todo-repository";

interface UpdateTodoRequest {
  id: string;
  subject: string;
  expected_date: Date;
  user_id: string;
}

interface TodoUseCaseResponse {
  todo: Todo
}


class UpdateTodoUseCase{
  constructor(private todoRepository: ITodosRepository){
    this.todoRepository = todoRepository
  }
  
  async execute({id, subject, expected_date, user_id}: UpdateTodoRequest): Promise<TodoUseCaseResponse>{

    const todoNotExists = await this.todoRepository.findById(id)

    if(!todoNotExists){
      throw new TodoNotExists()
    }

    const dateNow = new Date()

    if(dateNow > expected_date){
      throw new TodoPastDateError()
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