import { EnvironmentVariables } from '../server/models/domain/EnvironmentVariables';
import { environmentLoader } from '../server/modules/EnvironmentLoader';

export class MongoDbConfig {
  public readonly password: string;
  public readonly user: string;

  constructor(environmentVariables: EnvironmentVariables) {
    this.password = environmentVariables.MONGODB_PASSWORD;
    this.user = environmentVariables.MONGODB_USERNAME;
  }
}

export const mongoDbConfig: MongoDbConfig = new MongoDbConfig(
  environmentLoader.environmentVariables,
);
