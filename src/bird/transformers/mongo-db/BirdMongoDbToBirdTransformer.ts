import { BirdMongoDb } from '../../models/mongo-db/BirdMongoDb';
import { Transformer } from './../../../common/models/domain/Transformer';
import { Bird } from './../../models/domain/Bird';

export class BirdMongoDbToBirdTransformer
  implements Transformer<BirdMongoDb, Bird> {
  public async transform(birdMongoDb: BirdMongoDb): Promise<Bird> {
    const bird: Bird = {
      bornAt: birdMongoDb.born_at,
      comments: birdMongoDb.comments,
      createdAt: birdMongoDb.created_at,
      description: birdMongoDb.description,
      id: birdMongoDb._id,
      images: birdMongoDb.images,
      name: birdMongoDb.name,
      parentsId: birdMongoDb.parents_id,
      partnerId: birdMongoDb.partner_id,
      ringId: birdMongoDb.ring_id,
      updatedAt: birdMongoDb.updated_at,
    };

    return bird;
  }
}
