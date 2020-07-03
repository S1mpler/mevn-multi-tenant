import { Router } from 'express';
import { SessionController } from '../controllers/session.controller';
import { AccountController } from '../controllers/account.controller';
import { UserController } from '../controllers/user.controller';
import { OrganizationController } from '../controllers/organization.controller';
import { InviteController } from '../controllers/invite.controller';
import authorized from '../middleware/authorized';
import admin from '../middleware/admin';

const router = Router();

export const routes = () => {
  // Session routes
  router.post('/api/login', new SessionController().login);
  router.delete('/api/logout', new SessionController().logout);

  // Account routes
  router.post('/api/register/:code', new AccountController().registerUser);
  router.post('/api/register', new AccountController().registerAdmin);

  // User routes
  router.get('/api/users', [authorized, admin], new UserController().getAll);
  router.get(
    '/api/users/:id',
    [authorized, admin],
    new UserController().getOne
  );
  router.post('/api/users', [authorized, admin], new UserController().getAll);
  router.get('/api/users/register/:code', new UserController().getAll);

  // Organization routes
  router.get(
    '/api/organizations',
    [authorized, admin],
    new OrganizationController().getAll
  ); // only for admin
  router.get(
    '/api/organizations/:id',
    [authorized],
    new OrganizationController().getOne
  );
  router.post(
    '/api/organizations',
    [authorized, admin],
    new OrganizationController().createOrganization
  );

  // Invite routes
  router.post('api/invite', [authorized, admin], new InviteController().create);

  return router;
};
