import { BirdApiFixtures } from './../../fixtures/api/BirdApiFixtures';
import { BirdFixtures } from './../../fixtures/domain/BirdFixtures';
import { BirdToBirdApiTransformer } from './BirdToBirdApiTransformer';

describe('BirdToBirdApiTransformer', () => {
  let birdToBirdApiTransformer: BirdToBirdApiTransformer;

  beforeAll(() => {
    birdToBirdApiTransformer = new BirdToBirdApiTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await birdToBirdApiTransformer.transform(
          BirdFixtures.withMandatory,
        );
      });

      it('should return a Bird', () => {
        expect(result).toStrictEqual(BirdApiFixtures.withMandatory);
      });
    });

    describe('having a Bird with all its properties set', () => {
      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result = await birdToBirdApiTransformer.transform(
            BirdFixtures.withAllProperties,
          );
        });

        it('should return a Bird', () => {
          expect(result).toStrictEqual(BirdApiFixtures.withAllProperties);
        });
      });
    });
  });
});
