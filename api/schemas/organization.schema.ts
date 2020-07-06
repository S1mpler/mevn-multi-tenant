import { Schema, Document, model } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
}

const OrganizationSchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: { unique: true } },
  },
  { versionKey: false }
);

export default model<IOrganization>('Organization', OrganizationSchema);
