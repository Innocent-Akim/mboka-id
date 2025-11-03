import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { DatabaseConnectionConfig } from './config.factory';
import { Client } from 'pg';

/**
 * Automatically creates the database if it doesn't exist (PostgreSQL only)
 */
const ensureDatabaseExists = async (
  dbConfig: DatabaseConnectionConfig,
): Promise<void> => {
  if (dbConfig.type && dbConfig.type !== 'postgres') {
    // Skip for non-PostgreSQL databases
    return;
  }

  try {
    // Connect to the default database (postgres) to create the database if needed
    const adminClient = new Client({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.username,
      password: dbConfig.password,
      database: 'postgres', // Connect to default database
      ...(dbConfig.ssl ? { ssl: dbConfig.ssl } : {}),
    });

    await adminClient.connect();

    const result = await adminClient.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbConfig.name],
    );

    if (result.rows.length === 0) {
      console.log(`[Database Config] Creating database: ${dbConfig.name}`);
      await adminClient.query(`CREATE DATABASE "${dbConfig.name}"`);
      console.log(`[Database Config] Database "${dbConfig.name}" created successfully`);
    } else {
      console.log(`[Database Config] Database "${dbConfig.name}" already exists`);
    }

    await adminClient.end();
  } catch (error) {
    console.warn(
      `[Database Config] Could not ensure database exists: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

const createTypeOrmConfig = async (
  dbConfig: DatabaseConnectionConfig,
): Promise<TypeOrmModuleOptions> => {
  console.log('[Database Config] Connecting to:', {
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.name,
    username: dbConfig.username,
    password: dbConfig.password ? '***' : 'missing',
    synchronize: dbConfig.synchronize,
  });

  if (dbConfig.type === 'postgres' || !dbConfig.type) {
    await ensureDatabaseExists(dbConfig);
  }

  return {
    type: (dbConfig.type || 'postgres') as 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.name,
    synchronize: dbConfig.synchronize,
    logging: dbConfig.logging || false,
    autoLoadEntities: true,
    ...(dbConfig.ssl && (dbConfig.type === 'postgres' || !dbConfig.type)
      ? { ssl: dbConfig.ssl }
      : {}),
  };
};

/**
 * Returns TypeORM configuration for the default connection
 */
export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const defaultConfig = configService.get<DatabaseConnectionConfig>(
    'database.default',
  );
  if (!defaultConfig) {
    throw new Error('Default database configuration not found');
  }
  return createTypeOrmConfig(defaultConfig);
};

/**
 * Returns TypeORM configuration for a specific connection
 */
export const getTypeOrmConfigByName = async (
  configService: ConfigService,
  connectionName: string,
): Promise<TypeOrmModuleOptions> => {
  const dbConfig = configService.get<DatabaseConnectionConfig>(
    `database.databases.${connectionName}`,
  );
  if (!dbConfig) {
    throw new Error(
      `Database configuration "${connectionName}" not found. Available: ${Object.keys(
        configService.get('database.databases') || {},
      ).join(', ')}`,
    );
  }
  return createTypeOrmConfig(dbConfig);
};

/**
 * Returns all TypeORM configurations for all connections
 */
export const getAllTypeOrmConfigs = async (
  configService: ConfigService,
): Promise<Record<string, TypeOrmModuleOptions>> => {
  const databases =
    configService.get<Record<string, DatabaseConnectionConfig>>(
      'database.databases',
    ) || {};
  const configs: Record<string, TypeOrmModuleOptions> = {};
  for (const [name, dbConfig] of Object.entries(databases)) {
    configs[name] = await createTypeOrmConfig(dbConfig);
  }
  return configs;
};

