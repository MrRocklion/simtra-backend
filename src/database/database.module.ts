// src/app.module.ts o src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.appConfig;
        return {
          type: 'postgres',
          host: db.db_host,
          port: db.db_port,
          username: db.db_username,
          password: db.db_password,
          database: db.db_name,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
}
)
export class DatabaseModule {}
