import url from 'url';

import { hasValue } from '../../../utils/hasValue';
import { BirdApiCreationQuery } from '../../models/api/BirdApiCreationQuery';
import { birdApiSexToBirdSex } from '../../models/api/birdApisexToBirdSexMap';
import { BirdCreationQuery } from '../../models/domain/BirdCreationQuery';
import { Transformer } from './../../../common/models/domain/Transformer';

export class BirdApiCreationQueryToBirdCreationQueryTransformer
  implements Transformer<BirdApiCreationQuery, BirdCreationQuery> {
  public async transform(
    birdApiCreationQuery: BirdApiCreationQuery,
  ): Promise<BirdCreationQuery> {
    const bornAt: Date = new Date(birdApiCreationQuery.born_at);

    const birdCreationQuery: BirdCreationQuery = {
      bornAt: bornAt,
      comments: null,
      description: null,
      images: null,
      name: null,
      parentsId: null,
      partnerId: null,
      ringId: null,
      sex: null,
    };

    if (hasValue(birdApiCreationQuery.comments)) {
      birdCreationQuery.comments = birdApiCreationQuery.comments;
    }

    if (hasValue(birdApiCreationQuery.description)) {
      birdCreationQuery.description = birdApiCreationQuery.description;
    }

    if (hasValue(birdApiCreationQuery.images)) {
      birdCreationQuery.images = birdApiCreationQuery.images.map(
        (image: string) => new url.URL(image),
      );
    }

    if (hasValue(birdApiCreationQuery.name)) {
      birdCreationQuery.name = birdApiCreationQuery.name;
    }

    if (hasValue(birdApiCreationQuery.parents_id)) {
      birdCreationQuery.parentsId = birdApiCreationQuery.parents_id;
    }

    if (hasValue(birdApiCreationQuery.partner_id)) {
      birdCreationQuery.partnerId = birdApiCreationQuery.partner_id;
    }

    if (hasValue(birdApiCreationQuery.ring_id)) {
      birdCreationQuery.ringId = birdApiCreationQuery.ring_id;
    }

    if (hasValue(birdApiCreationQuery.sex)) {
      birdCreationQuery.sex = birdApiSexToBirdSex[birdApiCreationQuery.sex];
    }

    return birdCreationQuery;
  }
}

export const birdApiCreationQueryToBirdCreationQueryTransformer: BirdApiCreationQueryToBirdCreationQueryTransformer = new BirdApiCreationQueryToBirdCreationQueryTransformer();
