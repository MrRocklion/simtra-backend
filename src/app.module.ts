// app.module.ts
import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { MqttModule } from './modules/mqtt/mqtt.module';
import { AppLogger } from './common/logger/app-logger.module';
import { GpsModule } from './modules/gps/gps.module';

@Module({

  imports: [AppConfigModule, UserModule,DatabaseModule,VehicleModule,MqttModule,AppLogger,GpsModule],
  providers: [],
})
export class AppModule {}
