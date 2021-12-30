import { EnvironmentVariablesFixtures } from '../server/fixtures/domain/EnvironmentVariablesFixtures';
import { MongoDbConfig } from './MongoDbConfig';

describe('MongoDbConfig', () => {
  let mongoDbConfig: MongoDbConfig;

  beforeAll(() => {
    mongoDbConfig = new MongoDbConfig(
      EnvironmentVariablesFixtures.withMandatory,
    );
  });

  describe('when instantiated', () => {
    const expectedEnvironment: string =
      EnvironmentVariablesFixtures.withMandatory.ENVIRONMENT;
    const expectedHost: string =
      EnvironmentVariablesFixtures.withMandatory.MONGODB_HOST;
    const expectedName: string =
      EnvironmentVariablesFixtures.withMandatory.MONGODB_NAME;
    const expectedPassword: string =
      EnvironmentVariablesFixtures.withMandatory.MONGODB_PASSWORD;
    const expectedPort: number =
      EnvironmentVariablesFixtures.withMandatory.MONGODB_PORT;
    const expectedUsername: string =
      EnvironmentVariablesFixtures.withMandatory.MONGODB_USERNAME;

    it('should initialize values properly', () => {
      expect(mongoDbConfig.environment).toStrictEqual(expectedEnvironment);
      expect(mongoDbConfig.host).toStrictEqual(expectedHost);
      expect(mongoDbConfig.name).toStrictEqual(expectedName);
      expect(mongoDbConfig.password).toStrictEqual(expectedPassword);
      expect(mongoDbConfig.port).toStrictEqual(expectedPort);
      expect(mongoDbConfig.user).toStrictEqual(expectedUsername);
    });
  });
});
