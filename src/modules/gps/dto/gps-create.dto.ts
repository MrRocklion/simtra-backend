import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class GpsCreateDto {
  @ApiProperty({ example: -72.12321412 })
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty({ example: 1.21521521 })
  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  vehicleId: number;

  @ApiProperty({ example: '2025-06-08T17:35:00Z' })
  @IsNotEmpty()
  @IsDateString()
  timestamp: string;
}
