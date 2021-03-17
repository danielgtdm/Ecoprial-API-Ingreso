import { RoleType } from '../../shared/rol-type.enum';

export interface IJwtPayload {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  Roles: RoleType[];
  iat?: Date;
}
