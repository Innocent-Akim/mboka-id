# Exemples d'utilisation - Bases de données multiples

## Configuration avec une seule base de données (par défaut)

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@mboka-id/config';
import { DatabaseModule } from '@mboka-id/core';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule.forRoot(), // Utilise la connexion par défaut
  ],
})
export class AppModule {}
```

**Variables d'environnement (.env):**
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=mboka_id
```

## Configuration avec plusieurs bases de données

### Exemple 1: Deux bases de données PostgreSQL

**Variables d'environnement (.env):**
```env
# Base de données principale (default)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=mboka_main

# Liste des connexions (inclut 'default' automatiquement)
DATABASES=default,analytics

# Base de données analytics
DATABASE_ANALYTICS_HOST=analytics-db.example.com
DATABASE_ANALYTICS_PORT=5432
DATABASE_ANALYTICS_USERNAME=analytics_user
DATABASE_ANALYTICS_PASSWORD=analytics_pass
DATABASE_ANALYTICS_NAME=analytics_db
DATABASE_ANALYTICS_LOGGING=true
```

**Module:**
```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@mboka-id/config';
import { DatabaseModule } from '@mboka-id/core';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule.forRoot({
      connections: ['default', 'analytics'], // Initialise les deux connexions
    }),
  ],
})
export class AppModule {}
```

### Exemple 2: Base principale + Base de logs

**Variables d'environnement (.env):**
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=mboka_main

DATABASES=default,logs

DATABASE_LOGS_HOST=logs-db.example.com
DATABASE_LOGS_PORT=5432
DATABASE_LOGS_USERNAME=logs_user
DATABASE_LOGS_PASSWORD=logs_pass
DATABASE_LOGS_NAME=logs_db
DATABASE_LOGS_TYPE=postgres
```

**Module:**
```typescript
@Module({
  imports: [
    ConfigModule,
    DatabaseModule.forRoot({
      connections: ['default', 'logs'],
    }),
  ],
})
export class AppModule {}
```

## Utilisation dans un service

### Avec la connexion par défaut
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }
}
```

### Avec une connexion nommée
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Log } from './log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectDataSource('logs') // Nom de la connexion
    private dataSource: DataSource,
  ) {}

  async findAll() {
    return this.dataSource.getRepository(Log).find();
  }
}
```

### Avec plusieurs repositories de différentes connexions
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Analytics } from './analytics.entity';

@Injectable()
export class DataService {
  constructor(
    // Connexion par défaut
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    // Connexion analytics
    @InjectDataSource('analytics')
    private analyticsDataSource: DataSource,
  ) {}

  async getUserData(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const analytics = await this.analyticsDataSource
      .getRepository(Analytics)
      .find({ where: { userId } });
    
    return { user, analytics };
  }
}
```

## Configuration TypeORM dans un module avec connexion spécifique

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analytics } from './analytics.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Analytics], 'analytics'), // Nom de la connexion
  ],
})
export class AnalyticsModule {}
```

## Utiliser une connexion spécifique par défaut

```typescript
@Module({
  imports: [
    ConfigModule,
    DatabaseModule.forRoot({
      connectionName: 'analytics', // Utilise 'analytics' comme connexion par défaut
    }),
  ],
})
export class AppModule {}
```

## Notes importantes

1. **Connexion par défaut**: La connexion nommée `'default'` n'a pas besoin d'être spécifiée dans `@InjectRepository()` ou `TypeOrmModule.forFeature()`.

2. **Connexions nommées**: Pour utiliser une connexion nommée, vous devez :
   - La spécifier dans `connections` lors de l'initialisation
   - Utiliser le nom de la connexion dans `@InjectDataSource('name')` ou `TypeOrmModule.forFeature([Entity], 'name')`

3. **Format des variables**: Pour une connexion nommée `analytics`, utilisez le préfixe `DATABASE_ANALYTICS_*` (en majuscules).

