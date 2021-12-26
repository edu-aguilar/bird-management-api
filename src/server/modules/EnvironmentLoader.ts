import dotenv from 'dotenv';
import {
  str,
  cleanEnv,
  ValidatorSpec,
  CleanedEnvAccessors,
  host,
  port,
  url,
} from 'envalid';

import { hasValue } from '../../utils/hasValue';
import { EnvironmentVariables } from '../models/domain/EnvironmentVariables';

type Specs = {
  [K in keyof EnvironmentVariables]: ValidatorSpec<EnvironmentVariables[K]>;
};

export type CleanedEnvironmentVariables = Readonly<
  EnvironmentVariables & CleanedEnvAccessors
>;

class EnvironmentLoader {
  public environmentVariables: EnvironmentVariables;

  private readonly environmentFilePath: string = './config/.env';
  private readonly environmentSpecs: Specs = {
    ENVIRONMENT: str(),
    IMAGEKIT_API_ENDPOINT: url(),
    IMAGEKIT_PRIVATE_KEY: str(),
    IMAGEKIT_PUBLIC_KEY: str(),
    MONGODB_HOST: host(),
    MONGODB_NAME: str(),
    MONGODB_PASSWORD: str(),
    MONGODB_PORT: port(),
    MONGODB_USERNAME: str(),
  };

  constructor() {
    this.environmentVariables = this.load();
  }

  private load(): EnvironmentVariables {
    if (hasValue(this.environmentVariables)) {
      return this.environmentVariables;
    }

    let environmentVariables: EnvironmentVariables | null = null;

    const result: dotenv.DotenvConfigOutput = dotenv.config({
      path: this.environmentFilePath,
    });

    if (result.error) {
      throw new Error('Error loading .env file');
    }

    if (result.parsed) {
      environmentVariables = cleanEnv<EnvironmentVariables>(
        result.parsed,
        this.environmentSpecs,
      );
    }

    if (!hasValue(environmentVariables)) {
      throw new Error('Invalid Environment variables');
    }

    return environmentVariables;
  }
}

export const environmentLoader: EnvironmentLoader = new EnvironmentLoader();
