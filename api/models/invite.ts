import * as crypto from 'crypto';
import InviteSchema, { IInvite } from '../schemas/invite.schema';

export class Invite {
  public async createInvite(organizationId: string, email: string) {
    const code = crypto.randomBytes(32).toString('hex');

    return await new InviteSchema({ code, organizationId, email }).save();
  }

  public async getInvite(code: string) {
    return await InviteSchema.findOne({ code });
  }
}
