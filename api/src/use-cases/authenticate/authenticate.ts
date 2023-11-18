import { IUsersRepository, User } from "src/repositories/i-user-repository";
import { InvalidCredentialsError } from "../errors/user-invalid-credential";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string,
  password: string
}

interface AuthenticateUseCasetResponse {
  user: User
}

export class AuthenticateUseCase{
  constructor(private userRepository: IUsersRepository){
  }

  async execute({
    email,
    password  
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCasetResponse>{

    const user = await this.userRepository.findByEmail(email)

    if(!user){
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)
 
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }    

  } 
}