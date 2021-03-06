import { Request, Response } from 'express';
import { User } from '../models/user';

export class UserController {
  private user: User;

  constructor() {
    this.user = new User();
  }

  public getAll = async (request: Request, response: Response) => {
    const result = await this.user.getUsers();
    response.json(result);
  };

  public getOne = async (request: Request, response: Response) => {
    const userId = request.params.id;
    const result = await this.user.getUserById(userId);
    response.json(result);
  };
}
