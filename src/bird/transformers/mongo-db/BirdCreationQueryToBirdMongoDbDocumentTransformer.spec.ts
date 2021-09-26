jest.mock('uuid');

import { v4 as uuidv4 } from 'uuid';

import { BirdCreationQueryFixtures } from '../../fixtures/domain/BirdCreationQueryFixtures';
import { BirdMongoDbDocumentFixtures } from '../../fixtures/mongo-db/BirdMongoDbDocumentFixtures';
import { BirdCreationQueryToBirdMongoDbDocumentTransformer } from './BirdCreationQueryToBirdMongoDbDocumentTransformer';

describe('BirdCreationQueryToBirdMongoDbDocumentTransformer', () => {
  let birdCreationQueryToBirdMongoDbDocumentTransformer: BirdCreationQueryToBirdMongoDbDocumentTransformer;

  beforeAll(() => {
    birdCreationQueryToBirdMongoDbDocumentTransformer = new BirdCreationQueryToBirdMongoDbDocumentTransformer();
  });

  describe('.transform()', () => {
    beforeAll(() => {
      (uuidv4 as jest.Mock).mockReturnValue(
        BirdMongoDbDocumentFixtures.withMandatory._id,
      );

      jest.useFakeTimers('modern');
      jest.setSystemTime(BirdMongoDbDocumentFixtures.withMandatory.created_at);
    });

    afterAll(() => {
      jest.useRealTimers();
      jest.clearAllMocks();
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await birdCreationQueryToBirdMongoDbDocumentTransformer.transform(
          BirdCreationQueryFixtures.withMandatory,
        );
      });

      it('should return a BirdMongoDbDocument', () => {
        expect(result).toStrictEqual(BirdMongoDbDocumentFixtures.withMandatory);
      });
    });

    describe('having a BirdCreationQuery with all its properties set', () => {
      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result = await birdCreationQueryToBirdMongoDbDocumentTransformer.transform(
            BirdCreationQueryFixtures.withAllProperties,
          );
        });

        it('should return a BirdMongoDbDocument', () => {
          expect(result).toStrictEqual(
            BirdMongoDbDocumentFixtures.withAllProperties,
          );
        });
      });
    });
  });
});
