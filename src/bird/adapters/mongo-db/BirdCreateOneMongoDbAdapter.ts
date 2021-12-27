import { EntityCreateOneMongoDbAdapter } from '../../../mongo-db/adapters/EntityCreateOneMongoDbAdapter';
import { Bird } from '../../models/domain/Bird';
import { BirdMongoDb } from '../../models/mongo-db/BirdMongoDb';
import { BirdMongoDbDocument } from '../../models/mongo-db/BirdMongoDbDocument';
import { birdCreationQueryToBirdMongoDbDocumentTransformer } from '../../transformers/mongo-db/BirdCreationQueryToBirdMongoDbDocumentTransformer';
import { birdMongoDbToBirdTransformer } from '../../transformers/mongo-db/BirdMongoDbToBirdTransformer';
import { MongoDbDatasource } from './../../../mongo-db/datasources/MongoDbDatasource';
import { BirdCreationQuery } from './../../models/domain/BirdCreationQuery';

export class BirdCreateOneMongoDbAdapter extends EntityCreateOneMongoDbAdapter<
  BirdCreationQuery,
  Bird,
  BirdMongoDbDocument,
  BirdMongoDb
> {
  constructor(mongoDbDatasource: MongoDbDatasource) {
    const collectionName: string = 'birds';

    super(
      collectionName,
      birdCreationQueryToBirdMongoDbDocumentTransformer,
      birdMongoDbToBirdTransformer,
      mongoDbDatasource,
    );
  }
}
