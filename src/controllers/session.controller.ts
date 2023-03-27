import { Request, Response } from 'express';

import AuthenticateUserService from '../services/user/authenticate-user.service';

const authenticateUserService = new AuthenticateUserService();

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const { user, token } = await authenticateUserService.execute({
        email,
        password,
      });

      return response.json({ user, token });
    } catch (error) {
      return response.status(error.statusCode).send({ error: error.message });
    }
  }
}
