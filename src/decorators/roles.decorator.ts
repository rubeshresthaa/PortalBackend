import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../auth/schema/user.schema';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
