import { Interactor } from '../../common/models/domain/Interactor';
import { Bird } from '../models/domain/Bird';
import { birdCreateOneMongoDbAdapter } from './../adapters/mongo-db/BirdCreateOneMongoDbAdapter';
import { BirdCreationQuery } from './../models/domain/BirdCreationQuery';

export class CreateOneBirdInteractor
  implements Interactor<BirdCreationQuery, Bird> {
  public async interact(birdCreationQuery: BirdCreationQuery): Promise<Bird> {
    const bird: Bird = await birdCreateOneMongoDbAdapter.createOne(
      birdCreationQuery,
    );

    return bird;
  }
}

export const createOneBirdInteractor: CreateOneBirdInteractor = new CreateOneBirdInteractor();
