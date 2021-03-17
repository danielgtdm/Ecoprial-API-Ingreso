import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RoleType } from '../../shared/rol-type.enum';
import { Usuario } from '../usuario/usuario.entity';
import { AuthRepository } from './auth.repository';
import { SigninDto, SignupDto } from './dto';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<void> {
    const { email } = signupDto;
    const usuario = await this._authRepository.findOne({
      where: { email: email },
    });

    if (usuario) {
      throw new ConflictException();
    }

    return await this._authRepository.signup(signupDto);
  }

  async signin(
    signinDto: SigninDto,
  ): Promise<{ success: boolean; data: { token: string } }> {
    const { email, password } = signinDto;

    const usuario: Usuario = await this._authRepository.findOne({
      where: { email: email },
    });

    if (!usuario) {
      throw new NotFoundException();
    }

    const isMatch = await compare(password, usuario.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload: IJwtPayload = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      Roles: usuario.Roles.map((r) => r.nombre as RoleType),
    };

    const token = this._jwtService.sign(payload);

    return {
      success: true,
      data: {
        token: token,
      },
    };
  }
}
