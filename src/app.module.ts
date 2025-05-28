// app.module.ts
import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { AppLogger } from './common/logger/app-logger.service';

@Module({
  imports: [AppConfigModule],
  providers: [AppLogger],
})
export class AppModule {}
