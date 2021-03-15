import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { SignupDto } from './dto';

@EntityRepository(Usuario)
export class AuthRepository extends Repository<Usuario> {
  async signup(signup: SignupDto) {
    const { email, password } = signup;

    let usuario = new Usuario();
    usuario.email = email;
    usuario.password = password;
  }
}
