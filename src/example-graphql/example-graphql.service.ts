import { Injectable } from '@nestjs/common';
import { ExampleGraphQLRepository } from './example-graphql.repository';
import { UbLoggerFactory, UbLogger } from 'unibuddy-logger';

export interface IExampleGraphQLService {
  myServiceFunction(): boolean;
}

@Injectable()
export class ExampleGraphQLService implements IExampleGraphQLService {
  logger: UbLogger;
  constructor(private repository: ExampleGraphQLRepository) {
    this.logger = UbLoggerFactory.getLogger(ExampleGraphQLService.name);
  }

  myServiceFunction(): boolean {
    this.logger.info('bar baz');
    return this.repository.myRepositoryFunction();
  }
}
