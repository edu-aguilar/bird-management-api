import dotenv from 'dotenv';
import { str, cleanEnv, ValidatorSpec } from 'envalid';

type Specs = {
  [K in keyof unknown]: ValidatorSpec<unknown[K]>;
};

class EnvironmentLoader {
  private readonly environmentFilePath: string = './config/.env';
  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly environmentSpecs: Specs = {
    NAME: str(),
  };

  private environmentVariables: dotenv.DotenvParseOutput | null = null;

  public load(): void {
    const result: dotenv.DotenvConfigOutput = dotenv.config({
      path: this.environmentFilePath,
    });

    if (result.error) {
      throw new Error('Error loading .env file');
    }

    if (result.parsed) {
      cleanEnv(result.parsed, this.environmentSpecs);
      this.environmentVariables = result.parsed;
    }
  }

  public getEnvironmentVariables(): dotenv.DotenvParseOutput {
    if (this.environmentVariables) {
      return this.environmentVariables;
    } else {
      throw new Error('Environment not loaded, call .load() first');
    }
  }
}

export const environmentLoader: EnvironmentLoader = new EnvironmentLoader();
