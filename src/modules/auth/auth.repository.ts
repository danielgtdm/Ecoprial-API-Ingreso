import { RoleType } from '../../shared/rol-type.enum';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Rol } from '../rol/rol.entity';
import { RolRepository } from '../rol/rol.repository';
import { Usuario } from '../usuario/usuario.entity';
import { SignupDto } from './dto';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(Usuario)
export class AuthRepository extends Repository<Usuario> {
  async signup(signup: SignupDto) {
    const { email, password, nombre, apellido } = signup;

    let usuario = new Usuario();
    usuario.email = email;
    usuario.password = password;
    usuario.nombre = nombre;
    usuario.apellido = apellido;

    const rolRepository: RolRepository = getConnection().getRepository(Rol);
    const defaultRol: Rol = await rolRepository.findOne({
      where: { nombre: RoleType.PORTERIA },
    });

    usuario.Roles = [defaultRol];

    const salt = await genSalt(10);
    usuario.password = await hash(password, salt);

    await usuario.save();
  }
}
