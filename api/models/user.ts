import UserSchema from '../schemas/user.schema';

export class User {
  public async getUsers(options?: {}) {
    return await UserSchema.find(options);
  }

  public async getUserById(id: string) {
    return await UserSchema.findById(id);
  }
}
