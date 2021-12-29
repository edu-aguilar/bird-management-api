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

export class EnvironmentLoader {
  private readonly environmentVariables: EnvironmentVariables;

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
    PORT: port(),
  };

  constructor() {
    this.environmentVariables = this.load();
  }

  public load(): EnvironmentVariables {
    if (hasValue(this.environmentVariables)) {
      return this.environmentVariables;
    }

    let environmentVariables: EnvironmentVariables | null = null;

    if (process.env.NODE_ENV === 'local') {
      environmentVariables = this.loadEnvironmentVariablesFromEnvFile();
    } else {
      environmentVariables = this.loadEnvironmentVariablesFromProcess();
    }

    if (!hasValue(environmentVariables)) {
      throw new Error('Invalid Environment variables');
    }

    return environmentVariables;
  }

  private loadEnvironmentVariablesFromEnvFile(): EnvironmentVariables {
    const result: dotenv.DotenvConfigOutput = dotenv.config();
    let environmentVariables: EnvironmentVariables | null = null;

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
      throw new Error('error loading environment variables');
    }

    return environmentVariables;
  }

  private loadEnvironmentVariablesFromProcess(): EnvironmentVariables {
    const processEnvironmentVariables: unknown = {
      ENVIRONMENT: process.env.ENVIRONMENT,
      IMAGEKIT_API_ENDPOINT: process.env.IMAGEKIT_API_ENDPOINT,
      IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
      IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
      MONGODB_HOST: process.env.MONGODB_HOST,
      MONGODB_NAME: process.env.MONGODB_NAME,
      MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
      MONGODB_PORT: process.env.MONGODB_PORT,
      MONGODB_USERNAME: process.env.MONGODB_USERNAME,
      PORT: process.env.PORT,
    };

    const environmentVariables: EnvironmentVariables = cleanEnv<EnvironmentVariables>(
      processEnvironmentVariables,
      this.environmentSpecs,
    );

    return environmentVariables;
  }
}
