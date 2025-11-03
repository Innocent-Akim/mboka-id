# DatabaseModule Usage Guide

## Import

```typescript
import { DatabaseModule } from '@mboka-id/core';
// or
import { DatabaseModule } from '../database/database.module';
```

## 1. Single Default Connection

Use the default database connection (configured via `DATABASE_*` env variables):

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@mboka-id/config';
import { DatabaseModule } from '@mboka-id/core';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule.forRoot(), // Uses default connection
  ],
})
export class AppModule {}
```

**Environment variables:**
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=mboka_id
```

## 2. Single Named Connection

Use a specific named connection:

```typescript
@Module({
  imports: [
    ConfigModule,
    DatabaseModule.forRoot({
      connectionName: 'analytics', // Use 'analytics' connection
    }),
  ],
})
export class AppModule {}
```

**Environment variables:**
```env
DATABASES=default,analytics

DATABASE_ANALYTICS_HOST=analytics-db.com
DATABASE_ANALYTICS_PORT=5432
DATABASE_ANALYTICS_USERNAME=analytics_user
DATABASE_ANALYTICS_PASSWORD=analytics_pass
DATABASE_ANALYTICS_NAME=analytics_db
```

## 3. Multiple Connections

Initialize multiple database connections at once:

```typescript
@Module({
  imports: [
    ConfigModule,
    DatabaseModule.forRoot({
      connections: ['default', 'analytics', 'logs'], // Initialize these connections
    }),
  ],
})
export class AppModule {}
```

**Environment variables:**
```env
DATABASES=default,analytics,logs

# Default connection
DATABASE_HOST=localhost
DATABASE_NAME=mboka_main

# Analytics connection
DATABASE_ANALYTICS_HOST=analytics-db.com
DATABASE_ANALYTICS_NAME=analytics_db

# Logs connection
DATABASE_LOGS_HOST=logs-db.com
DATABASE_LOGS_NAME=logs_db
```

## 4. Using in Services

### With Default Connection

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // Uses default connection
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }
}
```

### With Named Connection

```typescript
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Analytics } from './analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectDataSource('analytics') // Specify connection name
    private analyticsDataSource: DataSource,
  ) {}

  async findAll() {
    return this.analyticsDataSource.getRepository(Analytics).find();
  }
}
```

### Using TypeOrmModule.forFeature() with Named Connection

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analytics } from './analytics.entity';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Analytics], 'analytics'), // Specify connection name
  ],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
```

Then in the service:

```typescript
@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics, 'analytics') // Specify connection name
    private analyticsRepository: Repository<Analytics>,
  ) {}
}
```

## 5. Multiple Repositories from Different Connections

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
    // Default connection
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    // Named connection
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

## Important Notes

1. **Always import ConfigModule first**: `ConfigModule` must be imported before `DatabaseModule` because it provides the configuration.

2. **Default connection**: When using `connectionName: 'default'` or no options, the connection name is `undefined` in TypeORM (which means it's the default connection).

3. **Named connections**: For named connections, you must:
   - Include them in the `connections` array` when initializing
   - Specify the connection name in `@InjectDataSource('name')` or `TypeOrmModule.forFeature([Entity], 'name')`

4. **Environment variables format**: 
   - Default: `DATABASE_*`
   - Named connection `analytics`: `DATABASE_ANALYTICS_*` (uppercase)

5. **Connection names**: Connection names are case-sensitive. Make sure they match in:
   - Environment variables (`DATABASE_ANALYTICS_*`)
   - `DATABASES` list (`DATABASES=analytics`)
   - Code (`@InjectDataSource('analytics')`)

