import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

/**
 * Module Users - Exporte l'entité User pour utilisation dans d'autres modules
 */
@Module({
  imports: [
    // Enregistre l'entité User dans TypeORM
    // autoLoadEntities est activé dans la config, mais on peut aussi l'enregistrer explicitement
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}

