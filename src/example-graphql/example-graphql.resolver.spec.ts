import { ExampleGraphQLResolver } from './example-graphql.resolver';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ExampleGraphQLService,
  IExampleGraphQLService,
} from './example-graphql.service';

class MockedExampleGraphQLService implements IExampleGraphQLService {
  myServiceFunction(): boolean {
    return true;
  }
}

describe('Resolver', () => {
  let resolver: ExampleGraphQLResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleGraphQLResolver,
        {
          provide: ExampleGraphQLService,
          useClass: MockedExampleGraphQLService,
        },
      ],
    }).compile();

    resolver = module.get<ExampleGraphQLResolver>(ExampleGraphQLResolver);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('resolver should return true', () => {
    const result = resolver.exampleGraphQLQuery();
    expect(result).toBe(true);
  });
});
