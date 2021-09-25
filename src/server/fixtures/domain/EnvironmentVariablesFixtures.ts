import { EnvironmentVariables } from './../../models/domain/EnvironmentVariables';

export class EnvironmentVariablesFixtures {
  public static get withMandatory(): EnvironmentVariables {
    const fixture: EnvironmentVariables = {
      MONGODB_HOST: 'localhost',
      MONGODB_PASSWORD: 'password',
      MONGODB_PORT: 3000,
      MONGODB_USERNAME: 'usernam',
    };

    return fixture;
  }
}
