import * as mongodb from 'mongodb';

import { Entity } from '../../common/models/domain/Entity';
import { Transformer } from '../../common/models/domain/Transformer';
import { EntityMongoDb } from '../../common/models/mongo-db/EntityMongoDb';
import { hasValue } from '../../utils/hasValue';
import { MongoDbDatasource } from '../datasources/MongoDbDatasource';
import { EntityCreateOneAdapter } from './../../common/models/domain/EntityCreateOneAdapter';

// TODO: unit test this
export abstract class EntityCreateOneMongoDbAdapter<
  TEntityCreationQuery,
  TEntity extends Entity,
  TEntityMongoDbDocument extends EntityMongoDb,
  TEntityMongoDb extends EntityMongoDb
> implements EntityCreateOneAdapter<TEntityCreationQuery, TEntity> {
  constructor(
    private readonly collectionName: string,
    private readonly entityCreationQueryToEntityMongoDbDocumentTransformer: Transformer<
      TEntityCreationQuery,
      TEntityMongoDbDocument
    >,
    private readonly entityMongoDbToEntityTransformer: Transformer<
      TEntityMongoDb,
      TEntity
    >,
    private readonly mongoDbDatasource: MongoDbDatasource,
  ) {
    this.collectionName = collectionName;
    this.entityCreationQueryToEntityMongoDbDocumentTransformer = entityCreationQueryToEntityMongoDbDocumentTransformer;
    this.entityMongoDbToEntityTransformer = entityMongoDbToEntityTransformer;
  }

  public async createOne(
    entityCreationQuery: TEntityCreationQuery,
  ): Promise<TEntity> {
    const entityMongoDbDocument: TEntityMongoDbDocument = await this.entityCreationQueryToEntityMongoDbDocumentTransformer.transform(
      entityCreationQuery,
    );

    const collection: mongodb.Collection<TEntityMongoDbDocument> = this.mongoDbDatasource.db.collection(
      this.collectionName,
    );

    await collection.insertOne(
      entityMongoDbDocument as mongodb.OptionalId<TEntityMongoDbDocument>,
    );

    const entityMongoDbDocumentFindFilter: mongodb.Filter<TEntityMongoDbDocument> = {
      _id: {
        $eq: entityMongoDbDocument._id,
      },
    } as mongodb.Filter<TEntityMongoDbDocument>;

    const entityMongodb: TEntityMongoDb | null = await collection.findOne<TEntityMongoDb>(
      entityMongoDbDocumentFindFilter,
    );

    if (!hasValue(entityMongodb)) {
      throw new Error('Entity does not exist');
    }

    const entity: TEntity = await this.entityMongoDbToEntityTransformer.transform(
      entityMongodb,
    );

    return entity;
  }
}
