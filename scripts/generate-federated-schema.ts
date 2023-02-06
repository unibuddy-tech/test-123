import 'reflect-metadata';
import { normalizeTypeDefs } from '@apollo/federation';
import { printWithComments } from '@graphql-tools/utils';
import { NestFactory } from '@nestjs/core';
import { promises as fs } from 'fs';
import { parse } from 'graphql';
import { request } from 'graphql-request';
import { AppModule } from '../src/app.module';
import { DEFAULT_PORT } from '../src/configuration/configuration';

const SDL_QUERY = `
  query {
    _service {
      sdl
    }
  }
`;

async function generateFederatedSchema(port: number): Promise<void> {
  const sdlResult = await request(
    `http://localhost:${port}/graphql`,
    SDL_QUERY,
  );
  const typeDefs = parse(sdlResult._service.sdl);

  const federatedSchema = `# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

${printWithComments(normalizeTypeDefs(typeDefs))}`;

  await fs.writeFile('./src/federated-schema.gql', federatedSchema, {
    encoding: 'utf8',
  });
}

async function generateSchema(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // Set the port one up from where it is in the configuration
  const port: number = DEFAULT_PORT + 1;
  await app.listen(port);
  await generateFederatedSchema(port);
  await app.close();
  process.exit();
}

generateSchema();
