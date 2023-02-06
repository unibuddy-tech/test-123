import { Module } from '@nestjs/common';
import { ExampleGraphQLRepository } from './example-graphql.repository';
import { ExampleGraphQLResolver } from './example-graphql.resolver';
import { ExampleGraphQLService } from './example-graphql.service';

@Module({
  providers: [
    ExampleGraphQLRepository,
    ExampleGraphQLResolver,
    ExampleGraphQLService,
  ],
  // Best practice is to only expose/export the service layer to other modules
  // and only if you need to
  // exports: [ExampleGraphQLService],
})
export class ExampleGraphQLModule {}
