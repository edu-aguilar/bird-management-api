import * as url from 'url';

import { v4 as uuidv4 } from 'uuid';

import { hasValue } from '../../../utils/hasValue';
import { BirdCreationQuery } from '../../models/domain/BirdCreationQuery';
import { BirdMongoDbBaseDocument } from '../../models/mongo-db/BirdMongoDbBaseDocument';
import { BirdMongoDbDocument } from '../../models/mongo-db/BirdMongoDbDocument';
import { birdSexToBirdMongoDbSexMap } from '../../models/mongo-db/birdSexToBirdMongoDbSex';
import { Transformer } from './../../../common/models/domain/Transformer';

export class BirdCreationQueryToBirdMongoDbDocumentTransformer
  implements Transformer<BirdCreationQuery, BirdMongoDbDocument> {
  public async transform(
    birdCreationQuery: BirdCreationQuery,
  ): Promise<BirdMongoDbBaseDocument> {
    const uuid: string = uuidv4();
    const date: Date = new Date();

    const birdMongoDbBaseDocument: BirdMongoDbBaseDocument = {
      _id: uuid,
      born_at: birdCreationQuery.bornAt,
      comments: null,
      created_at: date,
      description: null,
      images: null,
      name: null,
      parents_id: null,
      partner_id: null,
      ring_id: null,
      sex: null,
      updated_at: date,
    };

    if (hasValue(birdCreationQuery.comments)) {
      birdMongoDbBaseDocument.comments = birdCreationQuery.comments;
    }

    if (hasValue(birdCreationQuery.description)) {
      birdMongoDbBaseDocument.description = birdCreationQuery.description;
    }

    if (hasValue(birdCreationQuery.images)) {
      birdMongoDbBaseDocument.images = birdCreationQuery.images.map(
        (image: url.URL) => image.href,
      );
    }

    if (hasValue(birdCreationQuery.name)) {
      birdMongoDbBaseDocument.name = birdCreationQuery.name;
    }

    if (hasValue(birdCreationQuery.parentsId)) {
      birdMongoDbBaseDocument.parents_id = birdCreationQuery.parentsId;
    }

    if (hasValue(birdCreationQuery.partnerId)) {
      birdMongoDbBaseDocument.partner_id = birdCreationQuery.partnerId;
    }

    if (hasValue(birdCreationQuery.ringId)) {
      birdMongoDbBaseDocument.ring_id = birdCreationQuery.ringId;
    }

    if (hasValue(birdCreationQuery.sex)) {
      birdMongoDbBaseDocument.sex =
        birdSexToBirdMongoDbSexMap[birdCreationQuery.sex];
    }

    return birdMongoDbBaseDocument;
  }
}

export const birdCreationQueryToBirdMongoDbDocumentTransformer: BirdCreationQueryToBirdMongoDbDocumentTransformer = new BirdCreationQueryToBirdMongoDbDocumentTransformer();
