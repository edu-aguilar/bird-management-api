import { mongoDbDatasource } from './mongo-db/datasources/MongoDbDatasource';
import { Server } from './server/Server';

class BirdApp {
  public async initMongoDbConnection(): Promise<void> {
    try {
      await mongoDbDatasource.connect();

      console.log('Connected to MongoDb');
    } catch (error: unknown) {
      const stringifiedError: string = JSON.stringify(error);
      const formattedError: string = `Error connecting to MongoDb database. Reason: ${stringifiedError}`;

      throw new Error(formattedError);
    }
  }

  public async initServer(): Promise<void> {
    // TO DO: set port from environment config file.
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
