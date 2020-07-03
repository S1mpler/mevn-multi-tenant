import { Request, Response } from 'express';
import { Invite } from '../models/invite';

export class InviteController {
  private invite: Invite;

  constructor() {
    this.invite = new Invite();
  }

  public create = async (request: Request, response: Response) => {
    const organizationId = request.body.organizationId;
    const email = request.body.email;
    const result = await this.invite.createInvite(organizationId, email);

    response.status(201).json(result);
  };
}
