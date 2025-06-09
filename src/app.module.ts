// app.module.ts
import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { AppLogger } from './common/logger/app-logger.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';

@Module({

  imports: [AppConfigModule, UserModule,DatabaseModule,VehicleModule],
  providers: [AppLogger],
})
export class AppModule {}
