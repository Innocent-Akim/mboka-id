# Mboka ID - Monorepo

Ce monorepo contient l'application complète Mboka ID avec le backend (NestJS) et le frontend (Next.js). Il utilise **pnpm workspaces** et **Turborepo** pour une gestion optimale des dépendances et un système de build intelligent avec cache.

## 📦 Structure

```
mboka-id/
├── apps/
│   ├── backend/          # API NestJS
│   └── frontend/         # Application Next.js
├── packages/             # Packages partagés (optionnel)
├── tools/                # Outils et scripts (optionnel)
├── package.json          # Configuration racine du monorepo
├── pnpm-workspace.yaml   # Configuration des workspaces pnpm
├── turbo.json            # Configuration Turborepo
├── .npmrc                # Configuration pnpm
└── .turboignore          # Fichiers ignorés par Turborepo
```

## 🚀 Prérequis

- Node.js >= 18.0.0
- pnpm >= 8.0.0

Pour installer pnpm :
```bash
npm install -g pnpm
# ou
corepack enable
corepack prepare pnpm@8.15.0 --activate
```

## 📥 Installation

Installer toutes les dépendances :
```bash
pnpm install
```

## 🛠️ Scripts disponibles

### Développement

```bash
# Lancer backend et frontend en parallèle
pnpm dev
# - Frontend disponible sur http://localhost:4570
# - Backend disponible sur http://localhost:4571

# Lancer uniquement le backend (port 4571)
pnpm dev:backend

# Lancer uniquement le frontend (port 4570)
pnpm dev:frontend
```

### Build

```bash
# Builder tous les projets
pnpm build

# Builder uniquement le backend
pnpm build:backend

# Builder uniquement le frontend
pnpm build:frontend
```

### Linting

```bash
# Linter tous les projets
pnpm lint

# Linter et corriger automatiquement
pnpm lint:fix

# Linter uniquement le backend
pnpm lint:backend

# Linter uniquement le frontend
pnpm lint:frontend
```

### Tests

```bash
# Lancer tous les tests
pnpm test

# Lancer les tests en mode watch (backend uniquement)
pnpm test:watch

# Lancer les tests avec couverture de code
pnpm test:cov
```

### Formatage

```bash
# Formater le code dans tous les projets
pnpm format

# Vérifier le formatage sans modifier
pnpm format:check
```

### Visualisation

```bash
# Visualiser le graphe de dépendances des builds
pnpm graph
```

### Nettoyage

```bash
# Supprimer tous les node_modules et le cache
pnpm clean

# Supprimer tous les builds (dist, build, .next, out, coverage)
pnpm clean:build

# Nettoyer uniquement le cache Turborepo
pnpm clean:cache
```

## ⚡ Turborepo

Ce monorepo utilise **Turborepo** pour :
- **Cache intelligent** : Les builds sont mis en cache et réutilisés automatiquement
- **Exécution parallèle** : Les tâches s'exécutent en parallèle lorsque possible
- **Dépendances gérées** : Les tâches sont exécutées dans le bon ordre selon les dépendances
- **Cache distribué** : Possibilité de partager le cache entre les machines (CI/CD)

### Commandes Turborepo avancées

```bash
# Voir le statut du cache (dry-run)
turbo run build --dry-run

# Forcer une reconstruction (ignorer le cache)
turbo run build --force

# Voir les tâches qui seront exécutées
turbo run build --graph

# Filtrer par package
turbo run build --filter=@mboka-id/backend
turbo run build --filter=@mboka-id/frontend

# Exécuter uniquement les packages affectés
turbo run build --filter='[HEAD^1]'
```

### Configuration du cache

Le cache Turborepo est configuré dans `turbo.json`. Les sorties suivantes sont mises en cache :
- `dist/**` (builds backend)
- `.next/**` (builds Next.js, excluant `.next/cache/**`)
- `build/**` (autres builds)
- `coverage/**` (rapports de tests)

## 📝 Gestion des dépendances

### Ajouter une dépendance

```bash
# Ajouter une dépendance au backend
pnpm --filter @mboka-id/backend add <package>

# Ajouter une dépendance au frontend
pnpm --filter @mboka-id/frontend add <package>

# Ajouter une dépendance de développement
pnpm --filter @mboka-id/backend add -D <package>

# Ajouter une dépendance partagée à la racine
pnpm add -w <package>

# Ajouter une dépendance à tous les packages
pnpm add -r <package>
```

### Gestion des workspaces

Les workspaces sont configurés dans `pnpm-workspace.yaml` et incluent :
- `apps/*` - Applications principales
- `packages/*` - Packages partagés
- `tools/*` - Outils et scripts

## 🏗️ Architecture

- **Backend** (`apps/backend`) : API REST construite avec NestJS, TypeScript
- **Frontend** (`apps/frontend`) : Application web construite avec Next.js 16, React 19, TypeScript, Tailwind CSS

### Structure recommandée pour l'extension

Vous pouvez ajouter des packages partagés dans `packages/` :
```
packages/
├── shared-types/     # Types TypeScript partagés
├── ui/               # Composants UI partagés
└── utils/            # Utilitaires partagés
```

## 🎯 Avantages de cette configuration

- **Gestion unifiée** : Un seul point d'entrée pour tous les projets
- **Cache intelligent** : Turborepo met en cache les builds pour des exécutions plus rapides
- **Parallélisation** : Les tâches s'exécutent en parallèle quand c'est possible
- **Dépendances partagées** : Réduction de la duplication des dépendances avec hoisting
- **CI/CD optimisé** : Configuration prête pour l'intégration continue avec cache distribué
- **Type-safety** : Partage de types TypeScript entre packages

## 🔧 Configuration pnpm

La configuration pnpm est dans `.npmrc` :
- `shamefully-hoist=true` : Hoist des dépendances pour compatibilité
- `node-linker=hoisted` : Structure de nœuds hoisted
- `auto-install-peers=true` : Installation automatique des peer dependencies
- Patterns de hoisting public pour les outils de développement

## 🚢 Déploiement

### Build de production

```bash
# Builder tous les projets pour la production
pnpm build

# Les builds seront dans :
# - apps/backend/dist/
# - apps/frontend/.next/
```

### Variables d'environnement

Les variables d'environnement peuvent être définies dans :
- `.env` (racine)
- `.env.local` (local, non versionné)
- `apps/backend/.env`
- `apps/frontend/.env`

### Configuration des ports

Les ports sont configurés comme suit :
- **Frontend** : Port `4570` (http://localhost:4570)
- **Backend** : Port `4571` (http://localhost:4571)

Ces ports sont définis dans :
- `apps/frontend/package.json` - scripts `dev` et `start`
- `apps/backend/src/main.ts` - port par défaut
- `apps/backend/package.json` - variables d'environnement PORT dans les scripts

## 🐳 Docker

Ce projet inclut une configuration Docker complète pour le développement et la production.

### Prérequis

- Docker >= 20.10
- Docker Compose >= 2.0

### Production

Pour construire et lancer les conteneurs en mode production :

```bash
# Construire et lancer les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Reconstruire les images
docker-compose build --no-cache
```

Les services seront disponibles sur :
- Frontend: http://localhost:4570
- Backend: http://localhost:4571

### Développement

Pour lancer en mode développement avec hot-reload :

```bash
# Lancer en mode développement
docker-compose -f docker-compose.dev.yml up

# Lancer en arrière-plan
docker-compose -f docker-compose.dev.yml up -d

# Arrêter
docker-compose -f docker-compose.dev.yml down
```

### Commandes utiles

```bash
# Reconstruire une seule image
docker-compose build backend
docker-compose build frontend

# Voir les logs d'un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend

# Accéder au shell d'un conteneur
docker-compose exec backend sh
docker-compose exec frontend sh

# Nettoyer les images et volumes
docker-compose down -v --rmi all
```

### Structure Docker

- `apps/backend/Dockerfile` - Production build pour le backend
- `apps/backend/Dockerfile.dev` - Development build pour le backend
- `apps/frontend/Dockerfile` - Production build pour le frontend
- `apps/frontend/Dockerfile.dev` - Development build pour le frontend
- `docker-compose.yml` - Configuration pour la production
- `docker-compose.dev.yml` - Configuration pour le développement
- `.dockerignore` - Fichiers exclus des builds Docker

### Optimisations

- Utilisation de builds multi-stage pour réduire la taille des images
- Cache des dépendances pour accélérer les rebuilds
- Mode standalone pour Next.js (image optimisée)
- Health checks configurés pour les deux services

## 📚 Ressources

- [Documentation Turborepo](https://turbo.build/repo/docs)
- [Documentation pnpm workspaces](https://pnpm.io/workspaces)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contribution

1. Installer les dépendances : `pnpm install`
2. Créer une branche pour votre fonctionnalité
3. Développer avec : `pnpm dev`
4. Linter : `pnpm lint`
5. Tester : `pnpm test`
6. Builder : `pnpm build`
