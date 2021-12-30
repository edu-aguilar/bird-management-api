import { EnvironmentVariables } from './../../models/domain/EnvironmentVariables';

export class EnvironmentVariablesFixtures {
  public static get withMandatory(): EnvironmentVariables {
    const fixture: EnvironmentVariables = {
      ENVIRONMENT: 'local',
      IMAGEKIT_API_ENDPOINT: 'https://ik.imagekit.io/yulujpacgzq',
      IMAGEKIT_PRIVATE_KEY: 'private_fd9sf679gsdfh9sfh9ds8fs',
      IMAGEKIT_PUBLIC_KEY: 'public_fgdljndl498vu94o3unvoai',
      MONGODB_HOST: 'localhost',
      MONGODB_NAME: 'bbddName',
      MONGODB_PASSWORD: 'password',
      MONGODB_PORT: 3000,
      MONGODB_USERNAME: 'username',
      PORT: 0,
    };

    return fixture;
  }
}
