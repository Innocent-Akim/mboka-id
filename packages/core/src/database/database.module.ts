import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  getTypeOrmConfig,
  getAllTypeOrmConfigs,
  getTypeOrmConfigByName,
  ConfigModule,
} from '@mboka-id/config';
import { ConfigService } from '@nestjs/config';

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
          useFactory: async (configService: ConfigService) => {
            if (name === 'default') {
              return await getTypeOrmConfig(configService);
            }
            return await getTypeOrmConfigByName(configService, name);
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
          useFactory: async (configService: ConfigService) => {
            if (connectionName === 'default') {
              return await getTypeOrmConfig(configService);
            }
            return await getTypeOrmConfigByName(configService, connectionName);
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
    const imports = [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async () => {
          const allConfigs = await getAllTypeOrmConfigs(configService);
          const connectionNames = Object.keys(allConfigs);
          
          // Return the default connection config
          return allConfigs['default'] || allConfigs[connectionNames[0]];
        },
        inject: [ConfigService],
      }),
    ];

    return {
      module: DatabaseModule,
      imports,
      exports: [TypeOrmModule],
    };
  }
}
