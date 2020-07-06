import { Request, Response } from 'express';
import { Session } from '../models/session';

export default async (request: Request, response: Response, next: any) => {
  const session = new Session();

  const { token } = request.cookies;

  if (!token) {
    response.status(403).json({
      error: 'Authorization required',
    });
  }

  const userId = await session.validate(token);

  if (!userId) {
    response.status(403).json({
      error: 'Token is not valid',
    });
  }

  request['auth'] = { userId };
  next();
};
