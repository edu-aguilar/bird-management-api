import { MongoDbDatasourceBuilder } from './mongo-db/builders/MongoDbDatasourceBuilder';
import { MongoDbDatasource } from './mongo-db/datasources/MongoDbDatasource';
import { EnvironmentVariables } from './server/models/domain/EnvironmentVariables';
import { EnvironmentLoader } from './server/modules/EnvironmentLoader';
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

  public async initServer(port: number): Promise<void> {
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

  const environmentLoader: EnvironmentLoader = new EnvironmentLoader();

  const environmentVariables: EnvironmentVariables = environmentLoader.load();

  await birdApp.initMongoDbConnection();

  await birdApp.initServer(environmentVariables.PORT);
})();
