const bcrypt = require('bcryptjs');

import UserSchema, { IUser } from '../schemas/user.schema';
import AdminSchema from '../schemas/admin.schema';

export class Account {
  public async createAdminAccount(user: IUser) {
    const userAccount = await this.createUserAccount(user);

    const adminRole = await new AdminSchema({
      userId: userAccount._id,
    }).save();

    return adminRole;
  }

  public async createUserAccount(user: IUser) {
    user.passwordHash = this.hashPassword(user.password);
    const userAccount = await new UserSchema(user).save();
    return userAccount;
  }

  public async isAdmin(userId: string) {
    const admin = await AdminSchema.findOne({ userId }).exec();
    if (!admin) return false;
    return true;
  }

  public comparePasswords(targetPassword: string, hash: string) {
    return bcrypt.compareSync(targetPassword, hash);
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
}
