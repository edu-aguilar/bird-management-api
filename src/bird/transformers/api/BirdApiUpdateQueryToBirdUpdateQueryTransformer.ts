import { hasValue } from '../../../utils/hasValue';
import { birdApiSexToBirdSex } from '../../models/api/birdApisexToBirdSexMap';
import { BirdApiUpdateQuery } from '../../models/api/BirdApiUpdateQuery';
import { BirdUpdateQuery } from '../../models/domain/BirdUpdateQuery';
import { Transformer } from './../../../common/models/domain/Transformer';

export class BirdApiUpdateQueryToBirdUpdateQueryTransformer
  implements Transformer<BirdApiUpdateQuery, BirdUpdateQuery>
{
  public async transform(
    birdApiUpdateQuery: BirdApiUpdateQuery,
  ): Promise<BirdUpdateQuery> {
    const birdUpdateQuery: BirdUpdateQuery = {};

    if (hasValue(birdApiUpdateQuery.born_at)) {
      birdUpdateQuery.bornAt = new Date(birdApiUpdateQuery.born_at);
    }

    if (hasValue(birdApiUpdateQuery.comments)) {
      birdUpdateQuery.comments = birdApiUpdateQuery.comments;
    }

    if (hasValue(birdApiUpdateQuery.description)) {
      birdUpdateQuery.description = birdApiUpdateQuery.description;
    }

    if (hasValue(birdApiUpdateQuery.images)) {
      birdUpdateQuery.images = birdApiUpdateQuery.images;
    }

    if (hasValue(birdApiUpdateQuery.name)) {
      birdUpdateQuery.name = birdApiUpdateQuery.name;
    }

    if (hasValue(birdApiUpdateQuery.parents_id)) {
      birdUpdateQuery.parentsId = birdApiUpdateQuery.parents_id;
    }

    if (hasValue(birdApiUpdateQuery.partner_id)) {
      birdUpdateQuery.partnerId = birdApiUpdateQuery.partner_id;
    }

    if (hasValue(birdApiUpdateQuery.ring_id)) {
      birdUpdateQuery.ringId = birdApiUpdateQuery.ring_id;
    }

    if (hasValue(birdApiUpdateQuery.sex)) {
      birdUpdateQuery.sex = birdApiSexToBirdSex[birdApiUpdateQuery.sex];
    }

    return birdUpdateQuery;
  }
}
