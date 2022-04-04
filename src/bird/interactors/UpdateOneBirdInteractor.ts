import { BirdUpdateOneMongoDbAdapter } from '../adapters/mongo-db/BirdUpdateOneMongoDbAdapter';
import { Bird } from '../models/domain/Bird';
import { BirdUpdateQuery } from '../models/domain/BirdUpdateQuery';

export class UpdateOneBirdInteractor {
  constructor(
    private readonly birdUpdateOneMongoDbAdapter: BirdUpdateOneMongoDbAdapter = new BirdUpdateOneMongoDbAdapter(),
  ) {}

  public async interact(
    birdId: string,
    birdUpdateQuery: BirdUpdateQuery,
  ): Promise<Bird> {
    const bird: Bird = await this.birdUpdateOneMongoDbAdapter.updateOne(
      birdId,
      birdUpdateQuery,
    );

    return bird;
  }
}
