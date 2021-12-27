import { UploadImageImagekitAdapter } from '../../common/adapters/imagekit/UploadImageImagekitAdapter';
import { Interactor } from '../../common/models/domain/Interactor';
import { hasValue } from '../../utils/hasValue';
import { Bird } from '../models/domain/Bird';
import { ImagekitConfig } from './../../imagekit/ImagekitConfig';
import { EnvironmentLoader } from './../../server/modules/EnvironmentLoader';
import { BirdCreateOneMongoDbAdapter } from './../adapters/mongo-db/BirdCreateOneMongoDbAdapter';
import { BirdCreationQuery } from './../models/domain/BirdCreationQuery';

export class CreateOneBirdInteractor
  implements Interactor<BirdCreationQuery, Bird> {
  constructor(
    private readonly birdCreateOneMongoDbAdapter: BirdCreateOneMongoDbAdapter,
    private readonly environmentLoader: EnvironmentLoader,
  ) {}

  public async interact(birdCreationQuery: BirdCreationQuery): Promise<Bird> {
    let updatedBirdCreationQuery: BirdCreationQuery = { ...birdCreationQuery };

    const imagekitConfig: ImagekitConfig = new ImagekitConfig(
      this.environmentLoader.load(),
    );

    if (hasValue(birdCreationQuery.images)) {
      const uploadImageImagekitAdapter: UploadImageImagekitAdapter = new UploadImageImagekitAdapter(
        imagekitConfig,
      );

      try {
        updatedBirdCreationQuery = await uploadImageImagekitAdapter.uploadBirdImages(
          birdCreationQuery,
        );
      } catch (error: unknown) {
        console.log(error);
      }
    }

    const bird: Bird = await this.birdCreateOneMongoDbAdapter.createOne(
      updatedBirdCreationQuery,
    );

    return bird;
  }
}
