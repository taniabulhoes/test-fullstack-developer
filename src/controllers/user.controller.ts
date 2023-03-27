import { Request, Response } from 'express';

import CreateUserService from '../services/user/create-user.service';

const createUserService = new CreateUserService();

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const user = await createUserService.execute({
        email,
        name,
        password,
      });

      return response.json({ user });
    } catch (error) {
      return response.status(error.statusCode).send({ error: error.message });
    }
  }
}
