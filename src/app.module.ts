// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AppLogger } from './common/logger/app-logger.service';

@Module({
  imports: [ConfigModule],
  providers: [AppLogger],
})
export class AppModule {}
