import { prisma } from 'src/lib/prisma'
import { CreateTodoInput, DeleteTodoInput, ITodosRepository, Todo, UpdateTodoInput } from '../i-todo-repository'

class PrismaTodosRepository implements ITodosRepository {
  async findById(id: string) {
    const todo = await prisma.todo.findUnique({
      where: {
        id
      }
    })

    return todo
  }
  
  async findBySubject(subject: string){
    const todo = await prisma.todo.findFirst({
      where: {
        subject
      }
    })

    return todo
  }
  
  async list(userId: string, query?: string){
    const todos = await prisma.todo.findMany({
      where: {
        subject: {
          contains: query,
          mode: 'insensitive'
        },
        user_id: userId
      }      
    })

    return todos
  }
 
  async create(data: CreateTodoInput){
    const todo = await prisma.todo.create({
      data,
    })

    return todo
  }

  async update(data: UpdateTodoInput){
    const todo = await prisma.todo.update({
      where: {
        id: data.id,
        user_id: data.user_id
      },
      data: data
    })

    return todo
  }

  async delete(data: DeleteTodoInput){

    await prisma.todo.delete({
      where: {
        id: data.id,
        user_id: data.user_id
      },
    })

    return null
  }

  async concludeTask(id: string, userId: string, check: number){
    await prisma.todo.update({
      where: {
        id: id,
        user_id: userId
      },
      data: {
        checked: check
      }      
    })

    return null
  }
}

export {PrismaTodosRepository}
