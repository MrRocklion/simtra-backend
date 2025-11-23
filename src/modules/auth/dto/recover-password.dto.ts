import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecoverPasswordDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Correo de la cuenta que desea recuperar',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
