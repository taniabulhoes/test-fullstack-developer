import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists';
import { IUsersRepository, User } from 'src/repositories/i-user-repository';


interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}


interface UserUseCaseResponse {
  user: User
}


export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository){
    this.usersRepository = usersRepository    
  }

  async execute({
    name, email, password
  }: CreateUserRequest): Promise<UserUseCaseResponse>{

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