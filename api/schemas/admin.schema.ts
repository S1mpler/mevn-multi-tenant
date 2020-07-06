import { Schema, Document, model } from 'mongoose';
import { IUser } from './user.schema';

export interface IAdmin extends Document {
  userId: IUser['_id'];
}

const AdminSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  { versionKey: false }
);

export default model<IAdmin>('Admin', AdminSchema);
