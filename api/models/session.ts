import * as jwt from 'jsonwebtoken';
import SessionSchema from '../schemas/session.schema';
import UserSchema from '../schemas/user.schema';

const tokenSecret = 'my-secret';

export class Session {
  public async create(credentials: { email: string; password: string }) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw Error('Wrong request');
    }

    // get user by email
    const user = await UserSchema.findOne({ email: credentials.email });

    try {
      await SessionSchema.deleteOne({ userId: user._id }).exec();
    } catch (e) {}

    // create session with for the user
    const session = await new SessionSchema({
      userId: user._id,
    }).save();

    // generate new token
    const signedToken = jwt.sign({ sessionId: session._id }, tokenSecret, {
      expiresIn: 86400,
    });

    return [user, signedToken];
  }

  public async remove(authorization: { userId: string }) {
    if (!authorization || !authorization.userId) {
      throw Error('Wrong request');
    }

    const session = await SessionSchema.findOne({
      userId: authorization.userId,
    })
      .remove()
      .exec();

    return session;
  }

  public async validate(token: string) {
    const decoded = await jwt.verify(token, tokenSecret);
    const session = await SessionSchema.findById(decoded.sessionId);

    return session ? session.userId : null;
  }
}
