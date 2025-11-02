# @mboka-id/core

Package centralisé pour les librairies et configurations nécessaires au backend.

## 📦 Installation des dépendances

Pour ajouter une nouvelle librairie nécessaire au backend, installez-la dans ce package :

```bash
# Depuis la racine du monorepo
pnpm --filter @mboka-id/core add <package-name>

# Exemple : ajouter une librairie de validation
pnpm --filter @mboka-id/core add class-validator class-transformer

# Pour les dépendances de développement :
pnpm --filter @mboka-id/core add -D <package-name>
```

## 🏗️ Structure

- `src/config/` - Configuration NestJS avec validation Joi
- `src/database/` - Module TypeORM pour la base de données
- `src/bootstrap/` - Fonction de démarrage centralisée de l'application
- `src/app/` - Modules NestJS de base (AppModule, AppController, AppService)

> **Note**: Les contrats et interfaces sont maintenant dans le package séparé `@mboka-id/contracts`

## 📚 Dépendances incluses

### Core NestJS

- `@nestjs/common`
- `@nestjs/config`
- `@nestjs/platform-express`
- `@nestjs/typeorm`

### Base de données

- `typeorm`
- `pg` (driver PostgreSQL)

### Utilitaires

- `joi` (validation de schéma)
- `reflect-metadata` (requis pour les décorateurs)
- `rxjs` (requis par NestJS)

## 🔧 Utilisation

### Bootstrap de l'application

Dans votre fichier `main.ts` :

```typescript
import { bootstrapApplication } from '@mboka-id/core';
import { AppModule } from './app.module';

bootstrapApplication({
  module: AppModule,
  globalPrefix: 'api', // Optionnel, utilise config par défaut
  enableCors: true, // Optionnel
});
```

### Configuration

```typescript
import { ConfigModule } from '@mboka-id/core';

@Module({
  imports: [ConfigModule],
})
export class AppModule {}
```

### Base de données

```typescript
import { DatabaseModule } from '@mboka-id/core';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
```

### Accès à la configuration

```typescript
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {
  const port = this.configService.get<number>('server.port');
  const dbHost = this.configService.get<string>('database.host');
}
```

### Contrats et Interfaces

Les contrats sont maintenant dans le package dédié `@mboka-id/contracts` :

```typescript
import {
  IUser,
  ICreateUser,
  ILoginRequest,
  ILoginResponse,
  IBaseResponse,
  IPaginationParams
} from '@mboka-id/contracts';

// Dans un service
async createUser(data: ICreateUser): Promise<IBaseResponse<IUser>> {
  // ...
}

// Dans un controller
@Post('login')
async login(@Body() loginDto: ILoginRequest): Promise<ILoginResponse> {
  // ...
}
```

## 🚀 Build

```bash
pnpm --filter @mboka-id/core build
```
