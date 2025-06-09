import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppConfigService } from 'src/config/config.service';
import { AppLoggerService } from 'src/common/logger/app-logger.service';
import * as mqtt from 'mqtt';
import { GpsCreateDto } from '../gps/dto/gps-create.dto';
import { GpsService } from '../gps/gps.service';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;

  constructor(
    private readonly configService: AppConfigService,
    private readonly logger: AppLoggerService,
    private readonly gpsService: GpsService, // Asegúrate de que GpsService esté importado y disponible

  ) {
    this.client = mqtt.connect(`mqtts://${configService.config.mqtt.broker}:${configService.config.mqtt.port}`, {
      username: configService.config.mqtt.username,
      password: configService.config.mqtt.password,
      rejectUnauthorized: false,
    });

    this.client.on('connect', () => {
      this.logger.log('Conectado al broker MQTT');
    });

    this.client.on('error', (error) => {
      this.logger.error('Error en la conexión MQTT:', error instanceof Error ? error.stack : String(error));
    });
    
  }

  // en el futuro se recomienda tipar el message para tener un mayor control de los payloads
  async publish(topic: string, message: any): Promise<boolean> {
    const payload = JSON.stringify(message);
    try {
      await new Promise<void>((resolve, reject) => {
        this.client.publish(topic, payload, { qos: 1 }, (err) => {
          if (err) {
            this.logger.error('Error publicando en MQTT:', err instanceof Error ? err.stack : String(err));
            reject(err);
          } else {
            resolve();
          }
        });
      });
  
      return true; // Devuelve `true` si se publica correctamente
    } catch (error) {
      return false; // Devuelve `false` si hay un error
    }
  }
  onModuleDestroy() {
    this.client.end();
  }

  onModuleInit() {
   this.logger.log('MqttService está inicializado');

  this.client.subscribe('devices/vehicles/#', { qos: 1 }, (err) => {
    if (err) {
      this.logger.error('Error al suscribirse a devices/vehicles/#:', err.message);
    } else {
      this.logger.log('Suscripción a devices/vehicles/# exitosa');
    }
  });

  this.client.on('message', async (topic: string, payload: Buffer) => {
    try {
      const message = JSON.parse(payload.toString());

      const { lat, lng, timestamp } = message;

      if (
        typeof lat === 'number' &&
        typeof lng === 'number' &&
        timestamp
      ) {
        let vehicleId = parseInt(topic.split('/')[2], 10)
        const gpsDto: GpsCreateDto = {
          lat,
          lng,
          timestamp,
          vehicleId
        };

        await this.gpsService.createPoint(gpsDto);
        this.logger.log(`Datos GPS guardados para vehículo ${vehicleId}`);
      } else {
        this.logger.warn(`Payload inválido recibido en ${topic}: ${payload.toString()}`);
      }
    } catch (err) {
      this.logger.error('Error procesando mensaje MQTT:', err.message);
    }
  });
  }
}