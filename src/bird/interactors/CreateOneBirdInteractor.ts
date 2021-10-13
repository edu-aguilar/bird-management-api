import { UploadImageImagekitAdapter } from '../../common/adapters/imagekit/UploadImageImagekitAdapter';
import { Interactor } from '../../common/models/domain/Interactor';
import { hasValue } from '../../utils/hasValue';
import { Bird } from '../models/domain/Bird';
import { imagekitConfig } from './../../imagekit/ImagekitConfig';
import { birdCreateOneMongoDbAdapter } from './../adapters/mongo-db/BirdCreateOneMongoDbAdapter';
import { BirdCreationQuery } from './../models/domain/BirdCreationQuery';

export class CreateOneBirdInteractor
  implements Interactor<BirdCreationQuery, Bird> {
  public async interact(birdCreationQuery: BirdCreationQuery): Promise<Bird> {
    let updatedBirdCreationQuery: BirdCreationQuery = { ...birdCreationQuery };

    if (hasValue(birdCreationQuery.images)) {
      const uploadImageImagekitAdapter: UploadImageImagekitAdapter = new UploadImageImagekitAdapter(
        imagekitConfig,
      );

      updatedBirdCreationQuery = await uploadImageImagekitAdapter.uploadBirdImages(
        birdCreationQuery,
      );
    }

    const bird: Bird = await birdCreateOneMongoDbAdapter.createOne(
      updatedBirdCreationQuery,
    );

    return bird;
  }
}

export const createOneBirdInteractor: CreateOneBirdInteractor = new CreateOneBirdInteractor();
