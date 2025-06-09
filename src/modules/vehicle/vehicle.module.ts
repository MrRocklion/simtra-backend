import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Vehicle } from 'src/database/entities/vehicle.entity';
import { Gps } from 'src/database/entities/gps.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Vehicle,Gps])],
  providers: [VehicleService],
  controllers: [VehicleController]
})
export class VehicleModule {}
