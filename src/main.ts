// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './common/logger/app-logger.service';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(AppLogger);
  const appConfig = app.get(AppConfigService);

  logger.setLogLevelsByEnv(appConfig.config.app.node_env);

  app.useLogger(logger);

  logger.log('🚀 App is starting...');
  await app.listen(appConfig.config.app.port);
}
bootstrap();
