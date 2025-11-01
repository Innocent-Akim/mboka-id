import { registerAs } from '@nestjs/config';

export const serverConfig = registerAs('server', () => ({
  port: parseInt(process.env.PORT || '4571', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || 'api',
}));

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  name: process.env.DATABASE_NAME || 'mboka_id',
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
  ssl: process.env.DATABASE_SSL === 'true',
}));

export const appConfig = registerAs('app', () => ({
  name: process.env.APP_NAME || 'Mboka ID',
  version: process.env.APP_VERSION || '1.0.0',
  url: process.env.APP_URL || 'http://localhost:4571',
}));

