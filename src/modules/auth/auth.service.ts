import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailsService } from 'src/shared/mails/mails.service';
import { AppConfigService } from 'src/config/config.service';


@Injectable()
export class AuthService {
  constructor(
    private appConfigService: AppConfigService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const foundedUser = await this.usersService.findByEmail(email);

    if (!foundedUser)
      throw new HttpException(
        'Ups! Parece que no tienes un plan activo. Activa un plan ahora.',
        HttpStatus.NOT_FOUND,
      );

    const checkPassword = await compare(password, foundedUser.password);

    if (!checkPassword)
      throw new HttpException(
        'Correo o contraseña incorrectos',
        HttpStatus.FORBIDDEN,
      );

    const secretKey =  await this.appConfigService.crypto.jwt.secret
    const payload = {
      id: foundedUser.id,
      email: foundedUser.email,
      account_type: foundedUser.role,
    };

    const token = this.jwtService.sign(payload);
    return {
      message: 'Inicio de sesión exitoso',
      result: {
        id: foundedUser.id,
        name: foundedUser.name,
        lastname: foundedUser.lastname,
        email: foundedUser.email,
        birthdate: foundedUser.birthdate,
        dni: foundedUser.dni,
        role: foundedUser.role,
        profile: foundedUser.profile,
        gender: foundedUser.gender,
        token,
      },
    };
  }







}
