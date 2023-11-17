import { randomUUID } from "crypto";
import { CreateTodoInput, DeleteTodoInput, ITodosRepository, Todo, UpdateTodoInput } from "../i-todo-repository";

class InMemoryTodosRepository implements ITodosRepository{

  public items: Todo[] = [] 

  async findById(id: string) {
    const todo = this.items.find((item) => item.id === id)

    if(!todo){
      return null
    }

    return todo
  }

  async findBySubject(subject: string) {
    const toDo = this.items.find((item) => item.subject === subject)

    if(!toDo){
      return null
    }

    return toDo
  }

  async list(userId: string, query?: string){
    const todos = this.items
      .filter((item) => {
        if(query != undefined){
          return item.subject.includes(query) && item.user_id === userId
        }else{
          return item.user_id === userId
        }
      })

    return todos  
  }


  async create(data: CreateTodoInput) {
    const todo = {
      id: data.id ?? randomUUID(),
      subject: data.subject,
      expected_date: data.expected_date,
      user_id: data.user_id
    }

    this.items.push(todo)

    return todo
  }

  async update(data: UpdateTodoInput): Promise<Todo> {
    const todoIndex = this.items.findIndex((item) => item.id === data.id)

    const todoUpdated: Todo = data

    if(todoIndex >= 0){
      this.items[todoIndex] = todoUpdated 
    }

    return data
  }

  async delete(data: DeleteTodoInput){
    const todoIndex = this.items.findIndex((item) => item.id === data.id)


    this.items.splice(todoIndex, 1);

    return null
  }

}

export {InMemoryTodosRepository}