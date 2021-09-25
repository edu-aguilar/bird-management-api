import * as mongodb from 'mongodb';

import { mongoDbConfig, MongoDbConfig } from '../MongoDbConfig';

export class MongoDbDatasource {
  private mongoDbClient: mongodb.MongoClient | undefined;
  private readonly uri: string;

  constructor(mongoDbConfig: MongoDbConfig) {
    this.uri = `mongodb://${mongoDbConfig.user}:${mongoDbConfig.password}@${mongoDbConfig.host}:${mongoDbConfig.port}`;
  }

  public async connect(): Promise<void> {
    this.mongoDbClient = new mongodb.MongoClient(this.uri);

    await this.mongoDbClient.connect();

    console.log('Connected to MongoDb database.');
  }

  public get db(): mongodb.Db {
    if (!this.mongoDbClient) {
      throw new Error('MongoDbClient not initialized, call .connect() first');
    }

    return this.mongoDbClient.db();
  }
}

export const mongoDbDatasource: MongoDbDatasource = new MongoDbDatasource(
  mongoDbConfig,
);
