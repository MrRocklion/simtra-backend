// src/config/config.types.ts
export interface AppConfig {
  port: number;
  nodeEnv: string;
  db_host: string;
  db_port: number;
  db_username: string;
  db_password: string;
  db_name?: string; // Optional for some databases
  jwtSecret: string;
}
