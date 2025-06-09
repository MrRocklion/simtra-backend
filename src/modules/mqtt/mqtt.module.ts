import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { AppConfigService } from 'src/config/config.service';
import { AppLoggerService } from 'src/common/logger/app-logger.service';
import { GpsModule } from '../gps/gps.module';
import { AppLogger } from 'src/common/logger/app-logger.module';

@Module({
  imports: [AppLogger,GpsModule],
  providers: [MqttService,AppConfigService,AppLoggerService],
  exports: [MqttService],
})

export class MqttModule {}
