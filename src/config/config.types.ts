
interface DbConfig {
    host: string;
    port: number;
    username: string;
    paswword: string;
    database: string;
    ssl: boolean;
}

interface AppConfig {
    port: number;
    node_env: string;
}

interface MqttConfig {
    broker: string;
    port: number;
    username: string;
    password: string;
}

interface EmailConfig {
  email_user: string,
  email_password: string
}

interface CryptoConfig {
  salt: { size: number };
  jwt: { secret: string; expiration: string };
  secret: { key: string };
}
