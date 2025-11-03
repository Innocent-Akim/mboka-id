import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@mboka-id/config';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    // Uses default connection from @mboka-id/config
    // To use multiple connections: DatabaseModule.forRoot({ connections: ['default', 'db1', 'db2'] })
    DatabaseModule.forRoot(),
    UsersModule, // Import UsersModule to register User entity
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
