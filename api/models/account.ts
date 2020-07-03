// import * as bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

import UserSchema, { IUser } from '../schemas/user.schema';
import AdminSchema from '../schemas/admin.schema';
// import { bcrypt } from 'bcrypt';

export class Account {
  public async createAdminAccount(user: IUser) {
    const userAccount = await this.createUserAccount(user);

    const adminRole = await new AdminSchema({
      userId: userAccount._id,
    }).save();

    return adminRole;
  }

  public async createUserAccount(user: IUser) {
    user.passwordHash = await this.hashPassword(user.password);
    const userAccount = await new UserSchema(user).save();
    return userAccount;
  }

  public async isAdmin(userId: string) {
    const admin = await AdminSchema.findOne({ userId }).exec();
    if (!admin) return false;
    return true;
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async comparePasswords(targetPassword: string, hash: string) {
    return await bcrypt.compare(targetPassword, hash);
  }
}
