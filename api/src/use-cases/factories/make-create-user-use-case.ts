import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { CreateUserUseCase } from "../users/create"

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new CreateUserUseCase(userRepository)

  return useCase
}
