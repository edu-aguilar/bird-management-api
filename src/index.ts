import { MongoDbDatasourceBuilder } from './mongo-db/builders/MongoDbDatasourceBuilder';
import { MongoDbDatasource } from './mongo-db/datasources/MongoDbDatasource';
import { Server } from './server/Server';

class BirdApp {
  public async initMongoDbConnection(): Promise<void> {
    try {
      const mongoDbDatasource: MongoDbDatasource = new MongoDbDatasourceBuilder().build();

      await mongoDbDatasource.connect();

      console.log('Connected to MongoDb');
    } catch (error: unknown) {
      const formattedError: string = `Error connecting to MongoDb database. Reason: ${
        error as string
      }`;

      throw new Error(formattedError);
    }
  }

  public async initServer(): Promise<void> {
    // TODO: set port from environment config file.
    const port: number = 3000;
    const server: Server = new Server();

    try {
      await server.start(port);

      console.log(`Server running at port ${port}`);
    } catch (error) {
      const stringifiedError: string = JSON.stringify(error);
      const formattedError: string = `Error starting server. Reason: ${stringifiedError}`;

      throw new Error(formattedError);
    }
  }
}

void (async (): Promise<void> => {
  const birdApp: BirdApp = new BirdApp();

  await birdApp.initMongoDbConnection();

  await birdApp.initServer();
})();
