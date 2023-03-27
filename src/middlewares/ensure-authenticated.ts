import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../utils/error/app-error';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

export default function ensureAuthenticated(
  request: CustomRequest,
  response: Response,
  next: NextFunction
): Response | void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JTW token is missing', 402);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    return response.status(401).send({ error: error.message });
  }
}
