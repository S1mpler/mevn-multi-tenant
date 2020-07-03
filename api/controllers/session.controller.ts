import { Request, Response } from 'express';
import { Session } from '../models/session';

export class SessionController {
  private session: Session;

  constructor() {
    this.session = new Session();
  }

  public login = async (request: Request, response: Response) => {
    try {
      const [user, sessionToken] = await this.session.create(request.body);
      response
        .status(200)
        .cookie('token', sessionToken, { maxAge: 86400 })
        .json(user);
    } catch (err) {
      response.status(404).send('User not found');
    }
  };

  public logout = async (request: Request, response: Response) => {
    try {
      const sessionToken = await this.session.remove(request['auth']);
      response.status(200).clearCookie('token').send();
    } catch (err) {
      response.status(404).send();
    }
  };
}
