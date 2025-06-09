import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService} from 'src/config/config.service';
import { Gps } from './entities/gps.entity';
import { User } from './entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
@Module({
  imports: [
    AppConfigModule, // Importa ConfigModule para acceder a las variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule], // Asegura que ConfigService esté disponible
      inject: [AppConfigService], // Inyecta el servicio de configuración
      useFactory: (configService: AppConfigService) => ({
        type: 'postgres',
        host: configService.config.db.host,
        port: configService.config.db.port,
        username: configService.config.db.username,
        password: configService.config.db.paswword,
        database: configService.config.db.database,
        entities: [
          Gps,User,Vehicle
        ],
        synchronize: false,
      }),
    }),
  ],
  exports: [TypeOrmModule], // Exportamos TypeORM para usarlo en otros módulos
})
export class DatabaseModule {}