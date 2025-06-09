import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ example: 'LBA-2312' })
  @IsNotEmpty()
  plate: string;

  @ApiProperty({ example: 'Toyota' })
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'Hilux 4x2' })
  @IsNotEmpty()
  @MinLength(11)
  model: string;

  @ApiProperty({ example: '2025' })
  @IsEmail()
  year: number;

  @ApiProperty({ example: 3 })
  @IsEmail()
  userId: number;
}
