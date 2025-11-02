import Joi from 'joi';

export const configValidationSchema = Joi.object({
  // Server configuration
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(4571),
  API_PREFIX: Joi.string().default('api'),

  // Database configuration (par défaut)
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().default('postgres'),
  DATABASE_PASSWORD: Joi.string().default('postgres'),
  DATABASE_NAME: Joi.string().default('mboka_id'),
  DATABASE_TYPE: Joi.string()
    .valid('postgres', 'mysql', 'mariadb', 'sqlite', 'mongodb')
    .default('postgres'),
  DATABASE_SYNCHRONIZE: Joi.string().valid('true', 'false').default('false'),
  DATABASE_LOGGING: Joi.string().valid('true', 'false').default('false'),
  DATABASE_SSL: Joi.string().valid('true', 'false').default('false'),

  // Configuration pour plusieurs bases de données
  // Format: DATABASES=db1,db2,db3
  DATABASES: Joi.string().optional(),

  // Exemples pour bases additionnelles:
  // DATABASE_DB1_HOST, DATABASE_DB1_PORT, DATABASE_DB1_NAME, etc.
  // DATABASE_DB2_HOST, DATABASE_DB2_PORT, DATABASE_DB2_NAME, etc.

  // App configuration
  APP_NAME: Joi.string().default('Mboka ID'),
  APP_VERSION: Joi.string().default('1.0.0'),
  APP_URL: Joi.string().default('http://localhost:4571'),
});

