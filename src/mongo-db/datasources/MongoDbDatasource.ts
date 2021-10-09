import * as mongodb from 'mongodb';

import { mongoDbConfig, MongoDbConfig } from '../MongoDbConfig';

export class MongoDbDatasource {
  private readonly MONGODB_MAX_CONNETION_TIME: number = 5000;

  private mongoDbClient: mongodb.MongoClient | undefined;
  private readonly uri: string;
  private readonly dbName: string;

  constructor(mongoDbConfig: MongoDbConfig) {
    this.dbName = mongoDbConfig.name;
    this.uri = `mongodb://${mongoDbConfig.user}:${mongoDbConfig.password}@${mongoDbConfig.host}:${mongoDbConfig.port}`;
  }

  public async connect(): Promise<void> {
    this.mongoDbClient = new mongodb.MongoClient(this.uri, {
      connectTimeoutMS: this.MONGODB_MAX_CONNETION_TIME,
    });

    await this.mongoDbClient.connect();
  }

  public get db(): mongodb.Db {
    if (!this.mongoDbClient) {
      throw new Error('MongoDbClient not initialized, call .connect() first');
    }

    return this.mongoDbClient.db(this.dbName);
  }
}

export const mongoDbDatasource: MongoDbDatasource = new MongoDbDatasource(
  mongoDbConfig,
);
