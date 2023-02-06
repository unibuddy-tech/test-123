import { Test, TestingModule } from '@nestjs/testing';
import { ExampleGraphQLService } from './example-graphql.service';
import {
  ExampleGraphQLRepository,
  IExampleGraphQLRepository,
} from './example-graphql.repository';

class MockedExampleGraphQLRepository implements IExampleGraphQLRepository {
  myRepositoryFunction(): boolean {
    return true;
  }
}

describe('Service', () => {
  let service: ExampleGraphQLService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleGraphQLService,
        {
          provide: ExampleGraphQLRepository,
          useClass: MockedExampleGraphQLRepository,
        },
      ],
    }).compile();

    service = module.get<ExampleGraphQLService>(ExampleGraphQLService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('service should return true', () => {
    const result = service.myServiceFunction();
    expect(result).toBe(true);
  });
});
