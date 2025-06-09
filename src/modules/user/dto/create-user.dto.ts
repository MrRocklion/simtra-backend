import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Pérez' })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  @MinLength(11)
  dni: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail()
  email: string;

}
