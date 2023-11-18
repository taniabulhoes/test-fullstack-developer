import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate/authenticate"

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(userRepository)

  return useCase
}
