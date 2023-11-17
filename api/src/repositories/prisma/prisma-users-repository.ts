import { IUsersRepository, User, UserCreateInput } from '../i-user-repository'
import { prisma } from 'src/lib/prisma'

class PrismaUsersRepository implements IUsersRepository {
  async findByEmail(email: string){
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user
  }
 
  async create(data: UserCreateInput){

    const user = await prisma.user.create({
      data
    })

    return user
  }

}

export {PrismaUsersRepository}
