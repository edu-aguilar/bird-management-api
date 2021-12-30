import { EnvironmentVariables } from '../server/models/domain/EnvironmentVariables';

export class MongoDbConfig {
  public readonly environment: string;
  public readonly host: string;
  public readonly name: string;
  public readonly password: string;
  public readonly port: number;
  public readonly user: string;

  constructor(environmentVariables: EnvironmentVariables) {
    this.environment = environmentVariables.ENVIRONMENT;
    this.host = environmentVariables.MONGODB_HOST;
    this.name = environmentVariables.MONGODB_NAME;
    this.password = environmentVariables.MONGODB_PASSWORD;
    this.port = environmentVariables.MONGODB_PORT;
    this.user = environmentVariables.MONGODB_USERNAME;
  }
}
