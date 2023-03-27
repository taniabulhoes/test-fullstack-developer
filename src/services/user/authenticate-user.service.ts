import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { User } from '../../entities/User';
import authConfig from '../../config/auth';
import AppError from '../../utils/error/app-error';

import { AppDataSource } from '../../database/data-source';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ id: user.id, name: user.name }, secret, {
      expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}

export default AuthenticateUserService;
