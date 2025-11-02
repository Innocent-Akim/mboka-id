# Mboka ID - Monorepo

This monorepo contains the complete Mboka ID application with the backend (NestJS) and frontend (Next.js). It uses **pnpm workspaces** and **Turborepo** for optimal dependency management and an intelligent build system with caching.

## 📦 Structure

```
mboka-id/
├── apps/
│   ├── backend/          # NestJS API
│   └── frontend/         # Next.js Application
├── packages/             # Shared packages (optional)
├── tools/                # Tools and scripts (optional)
├── package.json          # Root monorepo configuration
├── pnpm-workspace.yaml   # pnpm workspaces configuration
├── turbo.json            # Turborepo configuration
├── .npmrc                # pnpm configuration
└── .turboignore          # Files ignored by Turborepo
```

## 🚀 Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

To install pnpm:
```bash
npm install -g pnpm
# or
corepack enable
corepack prepare pnpm@8.15.0 --activate
```

## 📥 Installation

Install all dependencies:
```bash
pnpm install
```

## 🛠️ Available Scripts

### Development

```bash
# Run backend and frontend in parallel
pnpm dev
# - Frontend available on http://localhost:4570
# - Backend available on http://localhost:4571

# Run backend only (port 4571)
pnpm dev:backend

# Run frontend only (port 4570)
pnpm dev:frontend
```

### Build

```bash
# Build all projects
pnpm build

# Build backend only
pnpm build:backend

# Build frontend only
pnpm build:frontend
```

### Linting

```bash
# Lint all projects
pnpm lint

# Lint and fix automatically
pnpm lint:fix

# Lint backend only
pnpm lint:backend

# Lint frontend only
pnpm lint:frontend
```

### Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (backend only)
pnpm test:watch

# Run tests with code coverage
pnpm test:cov
```

### Formatting

```bash
# Format code in all projects
pnpm format

# Check formatting without modifying
pnpm format:check
```

### Visualization

```bash
# Visualize the build dependency graph
pnpm graph
```

### Cleaning

```bash
# Remove all node_modules and cache
pnpm clean

# Remove all builds (dist, build, .next, out, coverage)
pnpm clean:build

# Clean Turborepo cache only
pnpm clean:cache
```

## ⚡ Turborepo

This monorepo uses **Turborepo** for:
- **Intelligent caching**: Builds are cached and automatically reused
- **Parallel execution**: Tasks run in parallel when possible
- **Managed dependencies**: Tasks are executed in the correct order based on dependencies
- **Distributed cache**: Ability to share cache between machines (CI/CD)

### Advanced Turborepo Commands

```bash
# See cache status (dry-run)
turbo run build --dry-run

# Force a rebuild (ignore cache)
turbo run build --force

# See tasks that will be executed
turbo run build --graph

# Filter by package
turbo run build --filter=@mboka-id/backend
turbo run build --filter=@mboka-id/frontend

# Run only affected packages
turbo run build --filter='[HEAD^1]'
```

### Cache Configuration

The Turborepo cache is configured in `turbo.json`. The following outputs are cached:
- `dist/**` (backend builds)
- `.next/**` (Next.js builds, excluding `.next/cache/**`)
- `build/**` (other builds)
- `coverage/**` (test reports)

## 📝 Dependency Management

### Adding a Dependency

```bash
# Add a dependency to backend
pnpm --filter @mboka-id/backend add <package>

# Add a dependency to frontend
pnpm --filter @mboka-id/frontend add <package>

# Add a development dependency
pnpm --filter @mboka-id/backend add -D <package>

# Add a shared dependency to root
pnpm add -w <package>

# Add a dependency to all packages
pnpm add -r <package>
```

### Workspace Management

Workspaces are configured in `pnpm-workspace.yaml` and include:
- `apps/*` - Main applications
- `packages/*` - Shared packages
- `tools/*` - Tools and scripts

## 🏗️ Architecture

- **Backend** (`apps/backend`): REST API built with NestJS, TypeScript
- **Frontend** (`apps/frontend`): Web application built with Next.js 16, React 19, TypeScript, Tailwind CSS

### Recommended Structure for Extension

You can add shared packages in `packages/`:
```
packages/
├── shared-types/     # Shared TypeScript types
├── ui/               # Shared UI components
└── utils/            # Shared utilities
```

## 🎯 Benefits of This Configuration

- **Unified management**: Single entry point for all projects
- **Intelligent caching**: Turborepo caches builds for faster executions
- **Parallelization**: Tasks run in parallel when possible
- **Shared dependencies**: Reduced dependency duplication with hoisting
- **Optimized CI/CD**: Ready for continuous integration with distributed cache
- **Type-safety**: Share TypeScript types between packages

## 🔧 pnpm Configuration

The pnpm configuration is in `.npmrc`:
- `shamefully-hoist=true`: Hoist dependencies for compatibility
- `node-linker=hoisted`: Hoisted node structure
- `auto-install-peers=true`: Automatic installation of peer dependencies
- Public hoisting patterns for development tools

## 🚢 Deployment

### Production Build

```bash
# Build all projects for production
pnpm build

# Builds will be in:
# - apps/backend/dist/
# - apps/frontend/.next/
```

### Environment Variables

Environment variables can be defined in:
- `.env` (root)
- `.env.local` (local, not versioned)
- `apps/backend/.env`
- `apps/frontend/.env`

### Port Configuration

Ports are configured as follows:
- **Frontend**: Port `4570` (http://localhost:4570)
- **Backend**: Port `4571` (http://localhost:4571)

These ports are defined in:
- `apps/frontend/package.json` - `dev` and `start` scripts
- `apps/backend/src/main.ts` - default port
- `apps/backend/package.json` - PORT environment variables in scripts

## 🐳 Docker

This project includes a complete Docker configuration for development and production.

### Prerequisites

- Docker >= 20.10
- Docker Compose >= 2.0

### Production

To build and run containers in production mode:

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild images
docker-compose build --no-cache
```

Services will be available on:
- Frontend: http://localhost:4570
- Backend: http://localhost:4571

### Development

To run in development mode with hot-reload:

```bash
# Run in development mode
docker-compose -f docker-compose.dev.yml up

# Run in background
docker-compose -f docker-compose.dev.yml up -d

# Stop
docker-compose -f docker-compose.dev.yml down
```

### Useful Commands

```bash
# Rebuild a single image
docker-compose build backend
docker-compose build frontend

# View logs for a specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh

# Clean images and volumes
docker-compose down -v --rmi all
```

### Docker Structure

- `apps/backend/Dockerfile` - Production build for backend
- `apps/backend/Dockerfile.dev` - Development build for backend
- `apps/frontend/Dockerfile` - Production build for frontend
- `apps/frontend/Dockerfile.dev` - Development build for frontend
- `docker-compose.yml` - Configuration for production
- `docker-compose.dev.yml` - Configuration for development
- `.dockerignore` - Files excluded from Docker builds

### Optimizations

- Use of multi-stage builds to reduce image size
- Dependency caching to speed up rebuilds
- Standalone mode for Next.js (optimized image)
- Health checks configured for both services

## 📚 Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm workspaces Documentation](https://pnpm.io/workspaces)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

1. Install dependencies: `pnpm install`
2. Create a branch for your feature
3. Develop with: `pnpm dev`
4. Lint: `pnpm lint`
5. Test: `pnpm test`
6. Build: `pnpm build`
