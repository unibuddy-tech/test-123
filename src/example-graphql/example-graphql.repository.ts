import { Injectable } from '@nestjs/common';

export interface IExampleGraphQLRepository {
  myRepositoryFunction(): boolean;
}

@Injectable()
export class ExampleGraphQLRepository implements IExampleGraphQLRepository {
  myRepositoryFunction(): boolean {
    return true;
  }
}
