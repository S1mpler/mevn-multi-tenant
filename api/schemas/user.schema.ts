import { Schema, Document, model } from 'mongoose';
import { IOrganization } from './organization.schema';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordHash: string;
  organizationId: IOrganization['_id'];
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    passwordHash: { type: String, select: false, required: true },
    organizationId: { type: Schema.Types.ObjectId, required: false },
  },
  { versionKey: false }
);

export default model<IUser>('User', UserSchema);
