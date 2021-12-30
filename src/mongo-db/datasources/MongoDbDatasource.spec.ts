jest.mock('mongodb');

import * as mongodb from 'mongodb';

import { EnvironmentVariablesFixtures } from './../../server/fixtures/domain/EnvironmentVariablesFixtures';
import { MongoDbConfig } from './../MongoDbConfig';
import { MongoDbDatasource } from './MongoDbDatasource';

describe('MongoDbDatasource', () => {
  const mongoDbConfig: MongoDbConfig = new MongoDbConfig(
    EnvironmentVariablesFixtures.withMandatory,
  );

  const testMongoDbDatasource: MongoDbDatasource = new MongoDbDatasource(
    mongoDbConfig,
  );

  describe('.db before executing .connect()', () => {
    let result: unknown;

    beforeAll(() => {
      try {
        void testMongoDbDatasource.db;
      } catch (error: unknown) {
        result = error;
      }
    });

    it('should throw an Error', () => {
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('.connect()', () => {
    describe('when called', () => {
      beforeAll(async () => {
        await testMongoDbDatasource.connect();
      });

      it('should call mongodb.MongoClient', () => {
        expect(mongodb.MongoClient).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('.db after executing .connect()', () => {
    let result: unknown;

    beforeAll(() => {
      result = testMongoDbDatasource.db;
    });

    it('should not throw an Error', () => {
      expect(result).not.toBeInstanceOf(Error);
    });
  });
});
