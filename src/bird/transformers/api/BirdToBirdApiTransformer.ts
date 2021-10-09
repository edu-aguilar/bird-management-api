import url from 'url';

import { hasValue } from '../../../utils/hasValue';
import { BirdApi } from '../../models/api/BirdApi';
import { BirdApiSex } from '../../models/api/BirdApiSex';
import { Bird } from '../../models/domain/Bird';
import { Transformer } from './../../../common/models/domain/Transformer';
import { birdSexToBirdApiSex } from './../../models/api/birdApisexToBirdSexMap';

export class BirdToBirdApiTransformer implements Transformer<Bird, BirdApi> {
  public async transform(bird: Bird): Promise<BirdApi> {
    const born_at: number = bird.bornAt.getTime();
    const created_at: number = bird.createdAt.getTime();
    const updated_at: number = bird.updatedAt.getTime();

    let images: string[] | null = null;
    let sex: BirdApiSex | null = null;

    if (hasValue(bird.images)) {
      images = bird.images.map((image: url.URL) => image.href);
    }

    if (hasValue(bird.sex)) {
      sex = birdSexToBirdApiSex[bird.sex];
    }

    const birdApi: BirdApi = {
      born_at: born_at,
      comments: bird.comments,
      created_at: created_at,
      description: bird.description,
      id: bird.id,
      images: images,
      name: bird.name,
      parents_id: bird.parentsId,
      partner_id: bird.partnerId,
      ring_id: bird.ringId,
      sex: sex,
      updated_at: updated_at,
    };

    return birdApi;
  }
}

export const birdToBirdApiTransformer: BirdToBirdApiTransformer = new BirdToBirdApiTransformer();
