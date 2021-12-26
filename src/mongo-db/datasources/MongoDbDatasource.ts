import * as mongodb from 'mongodb';

import { mongoDbConfig, MongoDbConfig } from '../MongoDbConfig';

export class MongoDbDatasource {
  private readonly MONGODB_MAX_CONNETION_TIME: number = 5000;

  private mongoDbClient: mongodb.MongoClient | undefined;
  private readonly uri: string;
  private readonly dbName: string;

  constructor(mongoDbConfig: MongoDbConfig) {
    this.dbName = mongoDbConfig.name;
    this.uri = this.buildConnectionUri(mongoDbConfig);
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

  private buildConnectionUri(mongoDbConfig: MongoDbConfig): string {
    let uri: string = '';

    if (mongoDbConfig.host === 'localhost') {
      uri = `mongodb://${mongoDbConfig.user}:${mongoDbConfig.password}@${mongoDbConfig.host}:${mongoDbConfig.port}`;
    } else {
      uri = `mongodb+srv://${mongoDbConfig.user}:${mongoDbConfig.password}@${mongoDbConfig.host}`;
    }

    return uri;
  }
}

export const mongoDbDatasource: MongoDbDatasource = new MongoDbDatasource(
  mongoDbConfig,
);
