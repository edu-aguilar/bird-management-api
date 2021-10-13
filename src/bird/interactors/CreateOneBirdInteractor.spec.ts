jest.mock('./../adapters/mongo-db/BirdCreateOneMongoDbAdapter');
jest.mock('../../common/adapters/imagekit/UploadImageImagekitAdapter');

import { UploadImageImagekitAdapter } from '../../common/adapters/imagekit/UploadImageImagekitAdapter';
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

      (UploadImageImagekitAdapter.prototype
        .uploadBirdImages as jest.Mock).mockResolvedValue(
        BirdCreationQueryFixtures.withImage,
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

    describe('having a BirdCreationQuery with images', () => {
      describe('when called', () => {
        beforeAll(async () => {
          await createOneBirdInteractor.interact(
            BirdCreationQueryFixtures.withImage,
          );
        });

        it('should call UploadImageImagekitAdapter.uploadBirdImages', () => {
          expect(
            UploadImageImagekitAdapter.prototype.uploadBirdImages,
          ).toHaveBeenCalledTimes(1);
          expect(
            UploadImageImagekitAdapter.prototype.uploadBirdImages,
          ).toHaveBeenCalledWith(BirdCreationQueryFixtures.withImage);
        });
      });
    });
  });
});
