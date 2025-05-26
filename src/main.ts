// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './common/logger/app-logger.service';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(AppLogger);
  const config = app.get(ConfigService);

  logger.setLogLevelsByEnv(config.appConfig.nodeEnv);

  app.useLogger(logger);

  logger.log('🚀 App is starting...');
  await app.listen(config.appConfig.port);
}
bootstrap();
