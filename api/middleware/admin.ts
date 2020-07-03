import { Request, Response } from 'express';
import { Account } from '../models/account';

export default async (request: Request, response: Response, next: any) => {
  const account = new Account();

  const { userId } = request['auth'];
  const isAdmin = await account.isAdmin(userId);

  if (!isAdmin) {
    response.status(403).send();
  }

  next();
};
