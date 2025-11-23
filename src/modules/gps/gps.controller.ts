import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';
import { Gps } from 'src/database/entities/gps.entity';
import { GpsService } from './gps.service';


@Controller('gps')
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener registros GPS' })
  @ApiParam({ name: 'vehicleId', type: Number, description: 'ID del vehículo' })
  @ApiCreatedResponse({ type: [Gps] })
  getAll(@Param('vehicleId') vehicleId: number) {
    return this.gpsService.findByVehicleId(vehicleId);
  }
}
