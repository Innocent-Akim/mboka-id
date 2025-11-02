import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.validation';
import { appConfig, databaseConfig, serverConfig } from './config.factory';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, databaseConfig, appConfig],
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
      envFilePath: ['.env.local', '.env'],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
