# Stage 1: Build
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/core/package.json ./packages/core/
COPY turbo.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/core ./packages/core
COPY apps/backend ./apps/backend
COPY turbo.json ./

# Build core package first
RUN pnpm --filter @mboka-id/core build

# Build the application
RUN pnpm --filter @mboka-id/backend build

# Stage 2: Production
FROM node:20-alpine AS runner

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/core/package.json ./packages/core/

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built packages from builder
COPY --from=builder /app/packages/core/dist ./packages/core/dist
COPY --from=builder /app/packages/core/package.json ./packages/core/
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

WORKDIR /app/apps/backend

# Expose port
EXPOSE 4571

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4571

# Start the application
CMD ["node", "dist/main.js"]

