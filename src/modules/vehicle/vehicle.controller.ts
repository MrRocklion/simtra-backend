import { Body, Controller, Post, Get, Param, Query, BadRequestException, Put, Patch } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';


@Controller('vehicle')
export class VehicleController {
	constructor(private readonly vehicleService: VehicleService) { }

	@Post('create')
	create(@Body() createVehicle: CreateVehicleDto) {
		return this.vehicleService.create(createVehicle);
	}

	@Patch('/assign_vehicle')
	assignVehicleToUser(
		@Query('register') register: number,
		@Query('user_id') user_id: number
	) {
		return this.vehicleService.assignVehicleToUser(+register, +user_id)
	}
}
