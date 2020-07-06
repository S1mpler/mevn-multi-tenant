import { Request, Response } from 'express';
import { Account } from '../models/account';
import { Invite } from '../models/invite';

export class AccountController {
  private account: Account;
  private invite: Invite;

  constructor() {
    this.account = new Account();
    this.invite = new Invite();
  }

  public registerAdmin = async (request: Request, response: Response) => {
    const adminData = request.body;
    let adminAccount;
    try {
      adminAccount = await this.account.createAdminAccount(adminData);
    } catch (e) {
      response.status(400).json({
        error: e,
      });
    }

    response.status(201).json(adminAccount);
  };

  public registerUser = async (request: Request, response: Response) => {
    const invitationCode = request.params.code;
    const userData = request.body.user;

    const invite = await this.invite.getInvite(invitationCode);
    userData.email = invite.email;
    userData.organizationId = invite.organizationId;

    let userAccount;
    try {
      userAccount = await this.account.createUserAccount(userData);
    } catch (e) {
      response.status(404).json({
        error: 'Cannot create user',
      });
    }

    response.status(201).json(userAccount);
  };
}
