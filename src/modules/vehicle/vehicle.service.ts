import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from 'src/database/entities/vehicle.entity';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const { userId, ...vehicleData } = createVehicleDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    const vehicle = this.vehicleRepository.create({
      ...vehicleData,
      user,
    });
    return await this.vehicleRepository.save(vehicle);
  }
}
