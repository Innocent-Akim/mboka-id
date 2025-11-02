import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  getTypeOrmConfig,
  getAllTypeOrmConfigs,
  getTypeOrmConfigByName,
} from '@mboka-id/config';

export interface DatabaseModuleOptions {
  /**
   * Nom de la connexion à utiliser (par défaut: 'default')
   * Si non spécifié, utilise la connexion par défaut
   */
  connectionName?: string;
  /**
   * Liste des noms de connexions à initialiser
   * Si non spécifié, seule la connexion par défaut est initialisée
   */
  connections?: string[];
}

@Module({})
export class DatabaseModule {
  /**
   * Crée un module avec la connexion par défaut ou une connexion spécifique
   */
  static forRoot(options?: DatabaseModuleOptions): DynamicModule {
    const connectionName = options?.connectionName || 'default';
    const useMultipleConnections = options?.connections && options.connections.length > 0;

    if (useMultipleConnections) {
      // Support pour plusieurs connexions
      const imports = options.connections!.map((name) =>
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          name: name === 'default' ? undefined : name,
          useFactory: (configService: ConfigService) => {
            if (name === 'default') {
              return getTypeOrmConfig(configService);
            }
            return getTypeOrmConfigByName(configService, name);
          },
          inject: [ConfigService],
        }),
      );

      return {
        module: DatabaseModule,
        imports,
        exports: [TypeOrmModule],
      };
    }

    // Connexion unique (par défaut ou spécifiée)
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          name: connectionName === 'default' ? undefined : connectionName,
          useFactory: (configService: ConfigService) => {
            if (connectionName === 'default') {
              return getTypeOrmConfig(configService);
            }
            return getTypeOrmConfigByName(configService, connectionName);
          },
          inject: [ConfigService],
        }),
      ],
      exports: [TypeOrmModule],
    };
  }

  /**
   * Initialise toutes les connexions configurées
   */
  static forRootAll(configService: ConfigService): DynamicModule {
    const allConfigs = getAllTypeOrmConfigs(configService);
    const connectionNames = Object.keys(allConfigs);

    const imports = connectionNames.map((name) =>
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        name: name === 'default' ? undefined : name,
        useFactory: () => allConfigs[name],
        inject: [],
      }),
    );

    return {
      module: DatabaseModule,
      imports,
      exports: [TypeOrmModule],
    };
  }
}
