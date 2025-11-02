import { Module } from '@nestjs/common';
import { ConfigModule } from '@mboka-id/config';
import { DatabaseModule } from '../database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    // Utilise la connexion par défaut
    // Pour utiliser plusieurs connexions: DatabaseModule.forRoot({ connections: ['default', 'db1', 'db2'] })
    DatabaseModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
