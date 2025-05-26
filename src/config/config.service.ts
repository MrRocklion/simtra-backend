// src/config/config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { AppConfig } from './config.types';

@Injectable()
export class ConfigService {
    constructor(private readonly config: NestConfigService) { }

    get appConfig(): AppConfig {
        return {
            port: parseInt(this.config.get('PORT', '3000')),
            nodeEnv: this.config.get('NODE_ENV', 'development'),
            db_host: this.config.getOrThrow<string>('DB_HOST'),
            db_port: parseInt(this.config.getOrThrow<string>('DB_PORT')),
            db_username: this.config.getOrThrow<string>('DB_USERNAME'),
            db_password: this.config.getOrThrow<string>('DB_PASSWORD'),
            db_name: this.config.get<string>('DB_NAME'), // Optional, can be undefined
            jwtSecret: this.config.getOrThrow<string>('JWT_SECRET'),
        };
    }
}
