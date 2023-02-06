import { Query, Resolver } from '@nestjs/graphql';
import { ExampleGraphQLService } from './example-graphql.service';

@Resolver()
export class ExampleGraphQLResolver {
  constructor(private service: ExampleGraphQLService) {}

  @Query(() => Boolean)
  exampleGraphQLQuery(): boolean {
    return this.service.myServiceFunction();
  }
}
