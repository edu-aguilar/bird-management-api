import { BirdApiCreationQueryFixtures } from './../../fixtures/api/BirdApiCreationQueryFixtures';
import { BirdCreationQueryFixtures } from './../../fixtures/domain/BirdCreationQueryFixtures';
import { BirdApiCreationQueryToBirdCreationQueryTransformer } from './BirdApiCreationQueryToBirdCreationQueryTransformer';

describe('BirdApiCreationQueryToBirdCreationQueryTransformer', () => {
  let birdApiCreationQueryToBirdCreationQueryTransformer: BirdApiCreationQueryToBirdCreationQueryTransformer;

  beforeAll(() => {
    birdApiCreationQueryToBirdCreationQueryTransformer = new BirdApiCreationQueryToBirdCreationQueryTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await birdApiCreationQueryToBirdCreationQueryTransformer.transform(
          BirdApiCreationQueryFixtures.withMandatory,
        );
      });

      it('should return a BirdCreationQuery', () => {
        expect(result).toStrictEqual(BirdCreationQueryFixtures.withMandatory);
      });
    });

    describe('having a BirdApiCreationQuery with all its properties set', () => {
      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result = await birdApiCreationQueryToBirdCreationQueryTransformer.transform(
            BirdApiCreationQueryFixtures.withAllProperties,
          );
        });

        it('should return a BirdCreationQuery', () => {
          expect(result).toStrictEqual(
            BirdCreationQueryFixtures.withAllProperties,
          );
        });
      });
    });
  });
});
