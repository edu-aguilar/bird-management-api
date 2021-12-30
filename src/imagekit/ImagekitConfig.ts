import { EnvironmentVariables } from '../server/models/domain/EnvironmentVariables';

export class ImagekitConfig {
  public readonly apiEndpoint: string;
  public readonly environment: string;
  public readonly privateKey: string;
  public readonly publicKey: string;

  constructor(environmentVariables: EnvironmentVariables) {
    this.apiEndpoint = environmentVariables.IMAGEKIT_API_ENDPOINT;
    this.environment = environmentVariables.ENVIRONMENT;
    this.privateKey = environmentVariables.IMAGEKIT_PRIVATE_KEY;
    this.publicKey = environmentVariables.IMAGEKIT_PUBLIC_KEY;
  }
}
