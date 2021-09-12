import * as mongodb from 'mongodb';

export class MongoDbDatasource {
  private mongoDbClient: mongodb.MongoClient | undefined;
  private readonly uri: string;

  constructor() {
    // TO DO: temporary connection uri. Refactor when environment vars are OK
    this.uri = `mongodb://birds-api:asdfasdf@localhost:27017`;
  }

  public async connect(): Promise<void> {
    this.mongoDbClient = new mongodb.MongoClient(this.uri);

    await this.mongoDbClient.connect();
  }

  public get db(): mongodb.Db {
    if (!this.mongoDbClient) {
      throw new Error('MongoDbClient not initialized, call .connect() first');
    }

    return this.mongoDbClient.db();
  }
}

export const mongoDbDatasource: MongoDbDatasource = new MongoDbDatasource();
