import { ITodosRepository, Todo } from "src/repositories/i-todo-repository";
import { TodoAlreadyExistsError } from "../errors/todo-already-exists";
import { TodoPastDateError } from "../errors/todo-past-date";

interface CreateTodoRequest {
  subject: string;
  expected_date: Date;
  user_id: string
}

interface TodoUseCaseResponse {
  todo: Todo
}

class CreateTodoUseCase{
  constructor(private todoRepository: ITodosRepository){
    this.todoRepository = todoRepository
  }
  
  async execute({subject, expected_date, user_id}: CreateTodoRequest): Promise<TodoUseCaseResponse>{

    const toDoAlredyExists = await this.todoRepository.findBySubject(subject)

    if(toDoAlredyExists){
      throw new TodoAlreadyExistsError
    }

    const dateNow = new Date()

    if(expected_date < dateNow){
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