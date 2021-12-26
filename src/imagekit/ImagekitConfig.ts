import { EnvironmentVariables } from '../server/models/domain/EnvironmentVariables';
import { environmentLoader } from '../server/modules/EnvironmentLoader';

export class ImagekitConfig {
  public readonly apiEndpoint: string;
  public readonly privateKey: string;
  public readonly publicKey: string;

  constructor(environmentVariables: EnvironmentVariables) {
    this.apiEndpoint = environmentVariables.IMAGEKIT_API_ENDPOINT;
    this.privateKey = environmentVariables.IMAGEKIT_PRIVATE_KEY;
    this.publicKey = environmentVariables.IMAGEKIT_PUBLIC_KEY;
  }
}

export const imagekitConfig: ImagekitConfig = new ImagekitConfig(
  environmentLoader.environmentVariables,
);