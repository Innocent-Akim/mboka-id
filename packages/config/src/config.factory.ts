import { registerAs } from '@nestjs/config';

export const serverConfig = registerAs('server', () => ({
  port: parseInt(process.env.PORT || '4571', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || 'api',
}));

export interface DatabaseConnectionConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  synchronize: boolean;
  logging: boolean;
  ssl: boolean;
  type?: 'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'mongodb';
}

const parseDatabaseConfig = (prefix: string): DatabaseConnectionConfig => ({
  host: process.env[`${prefix}_HOST`] || process.env.DATABASE_HOST || 'localhost',
  port: parseInt(
    process.env[`${prefix}_PORT`] || process.env.DATABASE_PORT || '5433',
    10,
  ),
  username:
    process.env[`${prefix}_USERNAME`] ||
    process.env.DATABASE_USERNAME ||
    'postgres',
  password:
    process.env[`${prefix}_PASSWORD`] ||
    process.env.DATABASE_PASSWORD ||
    'Akim12345',
  name:
    process.env[`${prefix}_NAME`] ||
    process.env.DATABASE_NAME ||
    'mboka_id',
  synchronize:
    process.env[`${prefix}_SYNCHRONIZE`] === 'true' ||
    process.env.DATABASE_SYNCHRONIZE === 'true',
  logging:
    process.env[`${prefix}_LOGGING`] === 'true' ||
    process.env.DATABASE_LOGGING === 'true',
  ssl:
    process.env[`${prefix}_SSL`] === 'true' ||
    process.env.DATABASE_SSL === 'true',
  type:
    (process.env[`${prefix}_TYPE`] ||
      process.env.DATABASE_TYPE ||
      'postgres') as DatabaseConnectionConfig['type'],
});

export const databaseConfig = registerAs('database', () => {
  // Default configuration (main connection)
  const defaultConfig = parseDatabaseConfig('DATABASE');
  
  console.log('[Config Factory] Database config loaded:', {
    host: defaultConfig.host,
    port: defaultConfig.port,
    username: defaultConfig.username,
    database: defaultConfig.name,
    passwordSet: !!defaultConfig.password,
    fromEnv: {
      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_PORT: process.env.DATABASE_PORT,
      DATABASE_USERNAME: process.env.DATABASE_USERNAME,
      DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ? '***' : 'not set',
      DATABASE_NAME: process.env.DATABASE_NAME,
    },
  });

  // Multiple databases support
  // Format: DATABASES=db1,db2,db3
  const databasesList = process.env.DATABASES?.split(',').map((db) =>
    db.trim(),
  ) || ['default'];

  const databases: Record<string, DatabaseConnectionConfig> = {
    default: defaultConfig,
  };

  // Parse additional configurations
  // Format: DATABASE_DB1_HOST, DATABASE_DB1_PORT, etc.
  databasesList.forEach((dbName) => {
    if (dbName !== 'default') {
      databases[dbName] = parseDatabaseConfig(`DATABASE_${dbName.toUpperCase()}`);
    }
  });

  return {
    default: defaultConfig,
    databases,
  };
});

export const appConfig = registerAs('app', () => ({
  name: process.env.APP_NAME || 'Mboka ID',
  version: process.env.APP_VERSION || '1.0.0',
  url: process.env.APP_URL || 'http://localhost:4571',
}));

