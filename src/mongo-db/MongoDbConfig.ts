import { EnvironmentVariables } from '../server/models/domain/EnvironmentVariables';
import { environmentLoader } from '../server/modules/EnvironmentLoader';

export class MongoDbConfig {
  public readonly password: string;
  public readonly user: string;
  public readonly host: string;
  public readonly port: number;

  constructor(environmentVariables: EnvironmentVariables) {
    this.password = environmentVariables.MONGODB_PASSWORD;
    this.user = environmentVariables.MONGODB_USERNAME;
    this.host = environmentVariables.MONGODB_HOST;
    this.port = environmentVariables.MONGODB_PORT;
  }
}

export const mongoDbConfig: MongoDbConfig = new MongoDbConfig(
  environmentLoader.environmentVariables,
);
