import * as url from 'url';

import { hasValue } from '../../../utils/hasValue';
import { BirdSex } from '../../models/domain/BirdSex';
import { BirdMongoDb } from '../../models/mongo-db/BirdMongoDb';
import { Transformer } from './../../../common/models/domain/Transformer';
import { Bird } from './../../models/domain/Bird';
import { birdMongoDbSexToBirdSexMap } from './../../models/mongo-db/BirdMongoDbSexToBirdSexMap';

export class BirdMongoDbToBirdTransformer
  implements Transformer<BirdMongoDb, Bird> {
  public async transform(birdMongoDb: BirdMongoDb): Promise<Bird> {
    let birdSex: BirdSex | null = null;
    let images: url.URL[] | null = null;

    if (hasValue(birdMongoDb.sex)) {
      birdSex = birdMongoDbSexToBirdSexMap[birdMongoDb.sex];
    }

    if (hasValue(birdMongoDb.images)) {
      images = birdMongoDb.images.map((image: string) => {
        return new url.URL(image);
      });
    }

    const bird: Bird = {
      bornAt: birdMongoDb.born_at,
      comments: birdMongoDb.comments,
      createdAt: birdMongoDb.created_at,
      description: birdMongoDb.description,
      id: birdMongoDb._id,
      images: images,
      name: birdMongoDb.name,
      parentsId: birdMongoDb.parents_id,
      partnerId: birdMongoDb.partner_id,
      ringId: birdMongoDb.ring_id,
      sex: birdSex,
      updatedAt: birdMongoDb.updated_at,
    };

    return bird;
  }
}

export const birdMongoDbToBirdTransformer: BirdMongoDbToBirdTransformer = new BirdMongoDbToBirdTransformer();
