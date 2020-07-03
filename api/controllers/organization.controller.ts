import { Request, Response } from 'express';
import { Organization } from '../models/organization';

export class OrganizationController {
  private organization: Organization;

  constructor() {
    this.organization = new Organization();
  }

  public getAll = async (request: Request, response: Response) => {
    const result = await this.organization.getOrganizations();

    response.json(result);
  };

  public getOne = async (request: Request, response: Response) => {
    const organizationId = request.params.id;
    const result = await this.organization.getOrganizationById(organizationId);

    response.json(result);
  };

  public createOrganization = async (request: Request, response: Response) => {
    const newOrganization = request.body;
    const result = await this.organization.createOrganization(newOrganization);

    response.status(201).json(result);
  };
}
