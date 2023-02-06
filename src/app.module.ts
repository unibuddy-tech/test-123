import { Module } from '@nestjs/common';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ExampleGraphQLModule } from './example-graphql/example-graphql.module';

@Module({
  imports: [
    ExampleGraphQLModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      fieldResolverEnhancers: ['guards'],
    }),
  ],
  providers: [],
})
export class AppModule {}
