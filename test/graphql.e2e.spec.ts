import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../src/app.module';

describe('my service', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
    console.info('Test cleared connection closed');
  });

  describe('example query', () => {
    it('returns true', async () => {
      const query = `
        query {
          exampleGraphQLQuery
        }
      `;

      const result = await supertest(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200);
      const jsonResult = JSON.parse(result.text);

      expect(jsonResult.data).toMatchObject({
        exampleGraphQLQuery: true,
      });
    });
  });
});
