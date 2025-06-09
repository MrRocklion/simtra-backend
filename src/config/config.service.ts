import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';





@Injectable()
export class AppConfigService {
    private readonly _db: DbConfig;
    private readonly _app:AppConfig;
    private readonly _mqtt:MqttConfig;

    constructor(private readonly configService: ConfigService) {
        this._db = {
            host: this.configService.get('DB_HOST') as string,
            port:this.configService.get('DB_PORT') as number,
            username:this.configService.get('DB_USER') as string,
            paswword:this.configService.get('DB_PASSWORD') as string,
            database:this.configService.get('DB_NAME') as string,
            ssl:this.configService.get('DB_SSL') as boolean
        };

        this._app ={
            port:this.configService.get('PORT') as number,
            node_env:this.configService.get('NODE_ENV') as string,
        }

         this._mqtt ={
            broker: this.configService.get('MQTT_BROKER') as string,
            port: this.configService.get('MQTT_PORT') as number,
            username: this.configService.get('MQTT_USER') as string,
            password: this.configService.get('MQTT_PASSWORD') as string
        }
    }
    get config() {
        return {
          db: this._db,
          app:this._app,
          mqtt:this._mqtt
        };
      }
    
}