# @mboka-id/config

Package de configuration centralisée pour les applications Mboka ID.

## 📦 Installation

Ce package est déjà inclus dans le workspace pnpm. Pour l'utiliser dans un autre package :

```bash
pnpm --filter <your-package> add @mboka-id/config
```

## 🏗️ Structure

```
packages/config/
├── src/
│   ├── config.factory.ts       # Configurations (server, database, app)
│   ├── config.module.ts        # Module NestJS de configuration
│   ├── config.validation.ts    # Validation Joi des variables d'environnement
│   ├── database.config.ts       # Configuration TypeORM
│   └── index.ts                 # Exports publics
├── package.json
├── tsconfig.json
└── README.md
```

## 📚 Exports

### ConfigModule

Module NestJS global qui configure `@nestjs/config` avec validation Joi.

```typescript
import { ConfigModule } from '@mboka-id/config';

@Module({
  imports: [ConfigModule],
})
export class AppModule {}
```

### Configurations

```typescript
import {
  serverConfig,
  databaseConfig,
  appConfig,
} from '@mboka-id/config';
```

### TypeORM Configuration

```typescript
import { getTypeOrmConfig } from '@mboka-id/config';

// Utilisé dans TypeOrmModule.forRootAsync()
```

## 🔧 Variables d'environnement

Voir `config.validation.ts` pour la liste complète des variables d'environnement supportées :

- **Server**: `PORT`, `NODE_ENV`, `API_PREFIX`
- **Database**: `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_NAME`, etc.
- **App**: `APP_NAME`, `APP_VERSION`, `APP_URL`

## 📝 Utilisation

### Dans un module NestJS

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigModule as MbokaConfigModule } from '@mboka-id/config';

@Module({
  imports: [MbokaConfigModule],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    // Accès aux configurations
    const dbHost = this.configService.get('database.host');
    const appName = this.configService.get('app.name');
  }
}
```

## 🔗 Dépendances

- `@nestjs/config` - Module de configuration NestJS
- `@nestjs/typeorm` - Support TypeORM pour la configuration de base de données
- `joi` - Validation de schéma

