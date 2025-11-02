import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { DatabaseConnectionConfig } from './config.factory';

const createTypeOrmConfig = (
  dbConfig: DatabaseConnectionConfig,
): TypeOrmModuleOptions => {
  return {
    type: (dbConfig.type || 'postgres') as 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.name,
    synchronize: dbConfig.synchronize,
    logging: dbConfig.logging,
    autoLoadEntities: true,
    // SSL uniquement pour PostgreSQL
    ...(dbConfig.ssl && (dbConfig.type === 'postgres' || !dbConfig.type)
      ? { ssl: dbConfig.ssl }
      : {}),
  };
};

/**
 * Retourne la configuration TypeORM pour la connexion par défaut
 */
export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const defaultConfig = configService.get<DatabaseConnectionConfig>(
    'database.default',
  );
  if (!defaultConfig) {
    throw new Error('Default database configuration not found');
  }
  return createTypeOrmConfig(defaultConfig);
};

/**
 * Retourne la configuration TypeORM pour une connexion spécifique
 */
export const getTypeOrmConfigByName = (
  configService: ConfigService,
  connectionName: string,
): TypeOrmModuleOptions => {
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
 * Retourne toutes les configurations TypeORM pour toutes les connexions
 */
export const getAllTypeOrmConfigs = (
  configService: ConfigService,
): Record<string, TypeOrmModuleOptions> => {
  const databases =
    configService.get<Record<string, DatabaseConnectionConfig>>(
      'database.databases',
    ) || {};
  const configs: Record<string, TypeOrmModuleOptions> = {};
  Object.entries(databases).forEach(([name, dbConfig]) => {
    configs[name] = createTypeOrmConfig(dbConfig);
  });
  return configs;
};

