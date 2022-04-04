import * as mongodb from 'mongodb';

import { BirdMongoDbToBirdTransformer } from '../../../bird/transformers/mongo-db/BirdMongoDbToBirdTransformer';
import { Transformer } from '../../../common/models/domain/Transformer';
import { MongoDbDatasourceBuilder } from '../../../mongo-db/builders/MongoDbDatasourceBuilder';
import { MongoDbDatasource } from '../../../mongo-db/datasources/MongoDbDatasource';
import { hasValue } from '../../../utils/hasValue';
import { Bird } from '../../models/domain/Bird';
import { BirdUpdateQuery } from '../../models/domain/BirdUpdateQuery';
import { BirdMongoDb } from '../../models/mongo-db/BirdMongoDb';
import { BirdMongoDbDocument } from '../../models/mongo-db/BirdMongoDbDocument';
import { birdSexToBirdMongoDbSexMap } from '../../models/mongo-db/birdSexToBirdMongoDbSex';

export class BirdUpdateOneMongoDbAdapter {
  private readonly collectionName: string = 'birds';

  constructor(
    private readonly mongoDbDatasource: MongoDbDatasource = new MongoDbDatasourceBuilder().build(),
    private readonly birdMongoDbToBirdTransformer: Transformer<
      BirdMongoDb,
      Bird
    > = new BirdMongoDbToBirdTransformer(),
  ) {}

  public async updateOne(
    birdId: string,
    birdUpdateQuery: BirdUpdateQuery,
  ): Promise<Bird> {
    const collection: mongodb.Collection<BirdMongoDbDocument> =
      this.mongoDbDatasource.db.collection(this.collectionName);

    const filterQuery: mongodb.Filter<BirdMongoDbDocument> = {
      _id: {
        $eq: birdId,
      },
    };

    const birdMongodbUpdateFilter: mongodb.UpdateFilter<BirdMongoDbDocument> =
      this.transformBirdUpdateQueryToBirdMongoDbUpdateFilter(birdUpdateQuery);

    await collection.updateOne(filterQuery, birdMongodbUpdateFilter);

    const birdMongodb: BirdMongoDb | null =
      await collection.findOne<BirdMongoDb>(filterQuery);

    if (!hasValue(birdMongodb)) {
      throw new Error('Bird not found');
    }

    const bird: Bird = await this.birdMongoDbToBirdTransformer.transform(
      birdMongodb,
    );

    return bird;
  }

  private transformBirdUpdateQueryToBirdMongoDbUpdateFilter(
    birdUpdateQuery: BirdUpdateQuery,
  ): mongodb.UpdateFilter<BirdMongoDbDocument> {
    const birdMongoDbDocument: Partial<BirdMongoDbDocument> = {};

    if (hasValue(birdUpdateQuery.bornAt)) {
      birdMongoDbDocument.born_at = birdUpdateQuery.bornAt;
    }

    if (hasValue(birdUpdateQuery.comments)) {
      birdMongoDbDocument.comments = birdUpdateQuery.comments;
    }

    if (hasValue(birdUpdateQuery.description)) {
      birdMongoDbDocument.description = birdUpdateQuery.description;
    }

    if (hasValue(birdUpdateQuery.images)) {
      birdMongoDbDocument.images = birdUpdateQuery.images;
    }

    if (hasValue(birdUpdateQuery.name)) {
      birdMongoDbDocument.name = birdUpdateQuery.name;
    }

    if (hasValue(birdUpdateQuery.parentsId)) {
      birdMongoDbDocument.parents_id = birdUpdateQuery.parentsId;
    }

    if (hasValue(birdUpdateQuery.partnerId)) {
      birdMongoDbDocument.partner_id = birdUpdateQuery.partnerId;
    }

    if (hasValue(birdUpdateQuery.ringId)) {
      birdMongoDbDocument.ring_id = birdUpdateQuery.ringId;
    }

    if (hasValue(birdUpdateQuery.sex)) {
      birdMongoDbDocument.sex = birdSexToBirdMongoDbSexMap[birdUpdateQuery.sex];
    }

    const birdMongodbUpdateFilter: mongodb.UpdateFilter<BirdMongoDbDocument> = {
      $set: {
        ...birdMongoDbDocument,
      },
    };

    return birdMongodbUpdateFilter;
  }
}
