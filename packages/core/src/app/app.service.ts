import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    const appName = this.configService.get<string>('app.name', 'Application');
    const appVersion = this.configService.get<string>('app.version', '1.0.0');
    return `${appName} v${appVersion}`;
  }

  getHealth(): { status: string; timestamp: string; environment: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: this.configService.get<string>(
        'server.nodeEnv',
        'development',
      ),
    };
  }
}