
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