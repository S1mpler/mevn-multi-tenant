import OrganizationSchema, {
  IOrganization,
} from '../schemas/organization.schema';

export class Organization {
  public async getOrganizations(options?: {}) {
    return await OrganizationSchema.find({}).exec();
  }

  public async getOrganizationById(id: string) {
    return await OrganizationSchema.findById(id).exec();
  }

  public async createOrganization(organization: IOrganization) {
    return await new OrganizationSchema(organization).save();
  }
}
