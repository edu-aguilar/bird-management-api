jest.mock('./../adapters/mongo-db/BirdCreateOneMongoDbAdapter');

import { birdCreateOneMongoDbAdapter } from './../adapters/mongo-db/BirdCreateOneMongoDbAdapter';
import { BirdCreationQueryFixtures } from './../fixtures/domain/BirdCreationQueryFixtures';
import { BirdFixtures } from './../fixtures/domain/BirdFixtures';
import { CreateOneBirdInteractor } from './CreateOneBirdInteractor';

describe('CreateOneBirdInteractor', () => {
  let createOneBirdInteractor: CreateOneBirdInteractor;

  beforeAll(() => {
    createOneBirdInteractor = new CreateOneBirdInteractor();
  });

  describe('.interact()', () => {
    beforeAll(() => {
      (birdCreateOneMongoDbAdapter.createOne as jest.Mock).mockResolvedValue(
        BirdFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await createOneBirdInteractor.interact(
          BirdCreationQueryFixtures.withMandatory,
        );
      });

      it('should call BirdCreateOneMongoDbAdapter.createOne', () => {
        expect(birdCreateOneMongoDbAdapter.createOne).toHaveBeenCalledTimes(1);
        expect(birdCreateOneMongoDbAdapter.createOne).toHaveBeenCalledWith(
          BirdCreationQueryFixtures.withMandatory,
        );
      });

      it('should return a Bird', () => {
        expect(result).toStrictEqual(BirdFixtures.withMandatory);
      });
    });
  });
});
