import { IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from '../../../shared/rol-type.enum';

export class UsuarioDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  Roles: RoleType[];
}
