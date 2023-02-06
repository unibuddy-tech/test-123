import { Test, TestingModule } from '@nestjs/testing';
import { ExampleGraphQLRepository } from './example-graphql.repository';

describe('Service', () => {
  let repository: ExampleGraphQLRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleGraphQLRepository],
    }).compile();

    repository = module.get<ExampleGraphQLRepository>(ExampleGraphQLRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('repository should return true', () => {
    const result = repository.myRepositoryFunction();
    expect(result).toBe(true);
  });
});
