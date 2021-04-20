import { EntityRepository, Repository } from 'typeorm';
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

    const salt = await genSalt(10);
    usuario.password = await hash(password, salt);

    await usuario.save();
  }
}
