import { Transformer } from '../../../common/models/domain/Transformer';
import { BirdFixtures } from '../../fixtures/domain/BirdFixtures';
import { Bird } from '../../models/domain/Bird';
import { BirdMongoDb } from '../../models/mongo-db/BirdMongoDb';
import { BirdMongoDbFixtures } from './../../fixtures/mongo-db/BirdMongoDbFixtures';
import { BirdMongoDbToBirdTransformer } from './BirdMongoDbToBirdTransformer';

describe('BirdMongoDbToBirdTransformer', () => {
  let birdMongoDbToBirdTransformer: Transformer<BirdMongoDb, Bird>;

  beforeAll(() => {
    birdMongoDbToBirdTransformer = new BirdMongoDbToBirdTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await birdMongoDbToBirdTransformer.transform(
          BirdMongoDbFixtures.withMandatory,
        );
      });

      it('should return a Bird', () => {
        expect(result).toStrictEqual(BirdFixtures.withMandatory);
      });
    });

    describe('having a BirdMongoDb with all nullable properties set', () => {
      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result = await birdMongoDbToBirdTransformer.transform(
            BirdMongoDbFixtures.withAllProperties,
          );
        });

        it('should return a Bird', () => {
          expect(result).toStrictEqual(BirdFixtures.withAllProperties);
        });
      });
    });
  });
});
