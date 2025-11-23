import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsInt,
} from 'class-validator';

import { Grupo } from 'src/common/enum/grupo.enum';
import { OperationStatus } from 'src/common/enum/operation-status.enum';

export class CreateVehicleDto {
  @IsNumber()
  @ApiProperty({ description: 'Número de registro del bus (ej: 1500 - 1738)', example: 1523 })
  register: number;


  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'ID del usuario dueño del vehículo', example: 4, required: false })
  user_id?: number;

  @IsString()
  @ApiProperty({ description: 'Cédula del socio', example: '0102030405' })
  dni: string;

  @IsEnum(OperationStatus)
  @ApiProperty({description:'enum de operacion del vehiculo , puede ser en ruta , inactivo etc',example:OperationStatus.ON_ROUTE})
  operation_status:OperationStatus

  @IsInt()
  @ApiProperty({ description: 'Empresa a la que pertenece el vehículo', example:1 })
  company_id: number;

  @IsString()
  @ApiProperty({ description: 'Placa del bus', example: 'ABC-1234' })
  plate: string;

  @IsEnum(Grupo)
  @ApiProperty({ description: 'Grupo al que pertenece el bus', enum: Grupo })
  grupo: Grupo;

}
