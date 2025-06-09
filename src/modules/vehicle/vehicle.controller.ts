import { Controller, Post, Get, Patch, Body } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { Vehicle } from 'src/database/entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo vehiculo' })
  @ApiCreatedResponse({ type: Vehicle })
  create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleService.create(createVehicleDto);
  }
}
