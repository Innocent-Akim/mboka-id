# @mboka-id/contracts

Package contenant les interfaces et contrats TypeScript partagés pour le backend.

## 📦 Installation

Ce package est automatiquement disponible dans le monorepo via workspace.

```bash
# Depuis la racine du monorepo
pnpm --filter @mboka-id/contracts build
```

## 🔧 Utilisation

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

## 📁 Structure

```
src/
├── base.contract.ts      # Interfaces de base (IBaseEntity, IBaseResponse, IPagination)
├── user.contract.ts      # Interfaces liées aux utilisateurs
├── auth.contract.ts      # Interfaces liées à l'authentification
└── index.ts              # Export centralisé
```

## ➕ Ajouter un nouveau contrat

1. Créer un nouveau fichier `*.contract.ts` dans `src/`
2. Définir vos interfaces
3. Exporter depuis `src/index.ts`

Exemple:

```typescript
// src/product.contract.ts
import { IBaseEntity } from "./base.contract";

export interface IProduct extends IBaseEntity {
  name: string;
  price: number;
  description?: string;
}
```

Puis ajouter dans `src/index.ts`:

```typescript
export * from "./product.contract";
```

## 🚀 Build

```bash
pnpm --filter @mboka-id/contracts build
```
