import { EnvironmentVariablesFixtures } from '../server/fixtures/domain/EnvironmentVariablesFixtures';
import { ImagekitConfig } from './ImagekitConfig';

describe('ImagekitConfig', () => {
  let imagekitConfig: ImagekitConfig;

  beforeAll(() => {
    imagekitConfig = new ImagekitConfig(
      EnvironmentVariablesFixtures.withMandatory,
    );
  });

  describe('when instantiated', () => {
    const expectedApiEndpoint: string =
      EnvironmentVariablesFixtures.withMandatory.IMAGEKIT_API_ENDPOINT;
    const expectedPrivateKey: string =
      EnvironmentVariablesFixtures.withMandatory.IMAGEKIT_PRIVATE_KEY;
    const expectedPublicKey: string =
      EnvironmentVariablesFixtures.withMandatory.IMAGEKIT_PUBLIC_KEY;

    it('should initialize values properly', () => {
      expect(imagekitConfig.apiEndpoint).toStrictEqual(expectedApiEndpoint);
      expect(imagekitConfig.privateKey).toStrictEqual(expectedPrivateKey);
      expect(imagekitConfig.publicKey).toStrictEqual(expectedPublicKey);
    });
  });
});
