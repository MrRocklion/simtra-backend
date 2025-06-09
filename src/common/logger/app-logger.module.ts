import { Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';

@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService], // Exportarlo para que otros módulos lo usen
})
export class AppLogger {}