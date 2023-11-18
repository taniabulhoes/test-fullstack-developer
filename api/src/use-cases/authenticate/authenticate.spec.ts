import { InMemoryUsersRepository } from "src/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Suite teste authenticate use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(userRepository)
  })
 
  it('Should be able to get to authenticate', async () => {
      const email = 'johndoe@example.com'

      await userRepository.create({
        name: 'John Doe',
        email,
        password_hash: await hash('123456', 6),        
      })


      const { user } = await sut.execute({
        email,
        password: '123456',
      })
  
      expect(user.id).toEqual(expect.any(String))  
      expect(user.email).toEqual('johndoe@example.com')  

  })
})