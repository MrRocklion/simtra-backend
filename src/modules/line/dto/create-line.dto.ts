import { IsString, IsOptional, MaxLength, MinLength, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLineDto {
  @ApiProperty({
    description: 'Nombre de la línea',
    example: 'Línea 12',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(1, { message: 'El nombre debe tener al menos 1 caracter' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
  description: 'Id de la compania',
  example:1,
  })
  company_id: number;


  @ApiPropertyOptional({
    description: 'Código de la línea',
    example: 'L12',
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'El código no puede exceder los 50 caracteres' })
  code?: string;

  @ApiPropertyOptional({
    description: 'Descripción de la línea',
    example: 'Línea que recorre la ruta norte-sur de la ciudad',
  })
  @IsString()
  @IsOptional()
  description?: string;
}