jest.mock('mongodb');

import * as mongodb from 'mongodb';

import { MongoDbDatasource, mongoDbDatasource } from './MongoDbDatasource';

describe('MongoDbDatasource', () => {
  const testMongoDbDatasource: MongoDbDatasource = mongoDbDatasource;

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
