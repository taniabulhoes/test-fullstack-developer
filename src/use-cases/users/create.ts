import { IUsersRepository } from '@/repositories/i-user-repository';
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists';


interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository){
    this.usersRepository = usersRepository    
  }

  async execute({
    name, email, password
  }: CreateUserRequest){

    const password_hash = await hash(password, 6)
    
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if(userWithSameEmail){
      throw new UserAlreadyExistsError()
    }


    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

    return {user}

  }
}