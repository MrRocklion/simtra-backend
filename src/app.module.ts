// app.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { MqttModule } from './modules/mqtt/mqtt.module';
import { AppLoggerModule } from './common/logger/app-logger.module';
import { GpsModule } from './modules/gps/gps.module';
import { LoggerMiddleware } from './common/logger/app-logger.middleware';
import { CompanyModule } from './modules/company/company.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppConfigService } from './config/config.service';
import { getmailsConfig } from './shared/mails/mails.config';
import { JwtModule } from '@nestjs/jwt';
import { LineModule } from './modules/line/line.module';

@Module({

  imports: [
    AppConfigModule,
    AppLoggerModule,
    CompanyModule,
    DatabaseModule,
    GpsModule,
    UsersModule,
    LineModule,
    VehicleModule,
    JwtModule.register({
      global: true,
    }),
    MqttModule,
    MailerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: getmailsConfig,
    }),
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // todas las rutas
  }
}
