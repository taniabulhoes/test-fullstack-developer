import { hash } from 'bcryptjs';

import { AppDataSource } from '../../database/data-source';
import { User } from '../../entities/User';
import AppError from '../../utils/error/app-error';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = AppDataSource.getRepository(User);

    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await usersRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }
}

export default CreateUserService;
