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
    const expectedHost: string =
      EnvironmentVariablesFixtures.withMandatory.MONGODB_HOST;
    const expectedPassword: string =
      EnvironmentVariablesFixtures.withMandatory.MONGODB_PASSWORD;
    const expectedPort: number =
      EnvironmentVariablesFixtures.withMandatory.MONGODB_PORT;
    const expectedUsername: string =
      EnvironmentVariablesFixtures.withMandatory.MONGODB_USERNAME;

    it('should initialize values properly', () => {
      expect(mongoDbConfig.host).toStrictEqual(expectedHost);
      expect(mongoDbConfig.password).toStrictEqual(expectedPassword);
      expect(mongoDbConfig.port).toStrictEqual(expectedPort);
      expect(mongoDbConfig.user).toStrictEqual(expectedUsername);
    });
  });
});
