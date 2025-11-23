import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Correo de la cuenta que desea actualizar la contraseña',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Nueva contraseña',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'currentPassword',
    description: 'Contraseña actual',
  })
  @IsNotEmpty()
  @IsString()
  current_password: string;
}
