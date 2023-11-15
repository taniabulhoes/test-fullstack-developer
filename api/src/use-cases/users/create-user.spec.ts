import { describe, beforeEach, it, expect } from 'vitest'
import { CreateUserUseCase } from './create'
import { UserAlreadyExistsError } from '../errors/user-already-exists'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'

let userRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Suite Test Create User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(userRepository)    
  })

  it('it should be able to create user', async () => {

    const {user} = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com.br',
      password: '!@#$%'      
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual('john.doe@example.com.br')
  })

  it('it should not be able to create user with same email twice', async () => {
    const email = 'john.doe@example.com.br'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '!@#$%'      
    })


    await expect(() => 
      sut.execute({
        name: 'John Doe',
        email,
        password: '!@#$%'      
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    
  })

})