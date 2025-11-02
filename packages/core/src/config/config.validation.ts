import Joi from 'joi';

export const configValidationSchema = Joi.object({
  // Server configuration
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(4571),
  API_PREFIX: Joi.string().default('api'),

  // Database configuration
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().default('postgres'),
  DATABASE_PASSWORD: Joi.string().default('postgres'),
  DATABASE_NAME: Joi.string().default('mboka_id'),
  DATABASE_SYNCHRONIZE: Joi.string().valid('true', 'false').default('false'),
  DATABASE_LOGGING: Joi.string().valid('true', 'false').default('false'),
  DATABASE_SSL: Joi.string().valid('true', 'false').default('false'),

  // App configuration
  APP_NAME: Joi.string().default('Mboka ID'),
  APP_VERSION: Joi.string().default('1.0.0'),
  APP_URL: Joi.string().default('http://localhost:4571'),
});
