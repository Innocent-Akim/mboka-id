import type { BootstrapOptions } from '@mboka-id/core';
import { bootstrapApplication } from '@mboka-id/core';
import type { Type } from '@nestjs/common';
import { AppModule } from './app.module';

void (async () => {
  try {
    const options: BootstrapOptions = {
      module: AppModule as Type<any>,
    };
    await (
      bootstrapApplication as (options: BootstrapOptions) => Promise<unknown>
    )(options);
  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1);
  }
})();
