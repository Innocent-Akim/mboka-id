import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Type } from '@nestjs/common';

export interface BootstrapOptions {
  module: Type<any>;
  port?: number;
  globalPrefix?: string;
  enableCors?: boolean;
  corsOptions?: any;
}

export async function bootstrapApplication(
  options: BootstrapOptions,
): Promise<INestApplication> {
  const { module, globalPrefix, enableCors = false, corsOptions } = options;

  const app = await NestFactory.create(module);

  const configService = app.get(ConfigService);

  // Set global prefix from options or config
  const apiPrefix =
    globalPrefix || configService.get<string>('server.apiPrefix', 'api');
  if (apiPrefix) {
    app.setGlobalPrefix(apiPrefix);
  }

  // Enable CORS if needed
  if (enableCors) {
    app.enableCors(corsOptions);
  }

  // Get port from config or options
  const port = options.port || configService.get<number>('server.port', 4571);

  await app.listen(port);

  const appName = configService.get<string>('app.name', 'Application');
  const nodeEnv = configService.get<string>('server.nodeEnv', 'development');

  console.log(`🚀 ${appName} is running on: http://localhost:${port}`);
  console.log(`📦 Environment: ${nodeEnv}`);

  return app;
}

