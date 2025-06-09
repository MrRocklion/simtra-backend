import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './common/logger/app-logger.service';
import { AppConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(AppLogger);
  const appConfig = app.get(AppConfigService);

  logger.setLogLevelsByEnv(appConfig.config.app.node_env);
  app.useLogger(logger);
  app.setGlobalPrefix('api');
  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentación de la API')
    .setDescription('API documentada con Swagger')
    .setVersion('1.0')
    .addBearerAuth() // Opcional: solo si usas JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  logger.log('🚀 App is starting...');
  await app.listen(appConfig.config.app.port);
}
bootstrap();
