import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gps } from 'src/database/entities/gps.entity';
import { Vehicle } from 'src/database/entities/vehicle.entity';
import { GpsCreateDto } from './dto/gps-create.dto';

@Injectable()
export class GpsService {
  constructor(
    @InjectRepository(Gps)
    private readonly gpsRepository: Repository<Gps>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository:Repository<Vehicle>,
  ) {}

  async findByVehicleId(vehicleId: number): Promise<Gps[]> {
    return this.gpsRepository.find({
      where: { vehicle: { id: vehicleId } },
      order: { timestamp: 'DESC' },
    });
  }

  async createPoint(gpsCreateDto:GpsCreateDto):Promise<Gps> {
    
    const { vehicleId, ...gpsData } = gpsCreateDto;
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId },
    });
    if (!vehicle) {
      throw new Error(`Vehicle with ID ${vehicleId} not found`);
    }
    const gps = this.gpsRepository.create({
      ...gpsData,
      vehicle,
    });
    return this.gpsRepository.save(gps);
  }
}
