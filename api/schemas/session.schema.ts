import { Schema, Document, model } from 'mongoose';
import { IUser } from './user.schema';

export interface ISession extends Document {
  // token: string;
  userId: IUser['_id'];
}

const SessionSchema: Schema = new Schema(
  {
    // token: { type: String, required: true, index: { unique: true } },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: { unique: true },
    },
  },
  { versionKey: false }
);

export default model<ISession>('Session', SessionSchema);
