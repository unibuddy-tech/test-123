import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APMModule } from 'unibuddy-apm';
import { DEFAULT_PORT } from './configuration/configuration';
import { UbLoggerFactory } from 'unibuddy-logger';
import { initialiseLogger } from './logger';

async function bootstrap() {
  // Initialise APM Module
  new APMModule();
  // Initialise Logger
  initialiseLogger();

  const app = await NestFactory.create(AppModule);

  await app.listen(DEFAULT_PORT);

  const logger = UbLoggerFactory.getLogger('main');
  logger.info(`app started ${DEFAULT_PORT}`);
}

bootstrap();
