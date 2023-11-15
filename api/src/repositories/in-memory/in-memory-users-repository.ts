import { randomUUID } from "crypto";
import { User, UserCreateInput, IUsersRepository } from "../i-user-repository";

class InMemoryUsersRepository implements IUsersRepository{
  public items: User[] = []

  async findByEmail(email: string){
    const user = this.items.find((item) => item.email === email)

    if(!user){
      return null
    }

    return user;
  }

  async create(data: UserCreateInput){  
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash
    }

    this.items.push(user)

    return user
  } 
}

export {InMemoryUsersRepository}