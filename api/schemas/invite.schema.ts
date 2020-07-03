import { Schema, Document, model } from 'mongoose';
import { IOrganization } from './organization.schema';

export interface IInvite extends Document {
  code: string;
  email: string;
  organizationId: IOrganization['_id'];
}

const InviteSchema: Schema = new Schema({
  code: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  organizationId: { type: Schema.Types.ObjectId, required: true },
});

export default model<IInvite>('Invite', InviteSchema);
