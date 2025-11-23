import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'URBASUR',
    description: 'Nombre de la compañía',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser un texto válido.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
  @MaxLength(100, { message: 'El nombre no puede superar 100 caracteres.' })
  name: string;

  @ApiProperty({
    example: 'Compañía Urbasur fundada en 1979',
    description: 'Descripción de la compañía',
    minLength: 5,
    maxLength: 255,
  })
  @IsString({ message: 'La descripción debe ser un texto válido.' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres.' })
  @MaxLength(255, { message: 'La descripción no puede superar 255 caracteres.' })
  description: string;
}
