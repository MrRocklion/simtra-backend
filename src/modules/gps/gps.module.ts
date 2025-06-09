import { Module } from '@nestjs/common';
import { GpsService } from './gps.service';
import { GpsController } from './gps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gps } from 'src/database/entities/gps.entity';
import { Vehicle } from 'src/database/entities/vehicle.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Gps,Vehicle])],
  controllers: [GpsController],
  providers: [GpsService],
  exports: [GpsService],
})
export class GpsModule {}
