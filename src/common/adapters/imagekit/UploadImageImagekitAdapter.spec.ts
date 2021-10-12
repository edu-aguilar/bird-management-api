jest.mock('imagekit');

import ImageKit from 'imagekit';
import { UploadOptions } from 'imagekit/dist/libs/interfaces';

import { BirdCreationQueryFixtures } from './../../../bird/fixtures/domain/BirdCreationQueryFixtures';
import { BirdCreationQuery } from './../../../bird/models/domain/BirdCreationQuery';
import { ImagekitUploadResponseFixtures } from './../../../imagekit/fixtures/domain/ImagekitUploadResponseFixtures';
import { ImagekitConfig } from './../../../imagekit/ImagekitConfig';
import { EnvironmentVariablesFixtures } from './../../../server/fixtures/domain/EnvironmentVariablesFixtures';
import { UploadImageImagekitAdapter } from './UploadImageImagekitAdapter';

describe('UploadImageImagekitAdapter', () => {
  let uploadImageImagekitAdapter: UploadImageImagekitAdapter;
  let imageKitconfigFixture: ImagekitConfig;

  beforeAll(() => {
    imageKitconfigFixture = new ImagekitConfig(
      EnvironmentVariablesFixtures.withMandatory,
    );

    uploadImageImagekitAdapter = new UploadImageImagekitAdapter(
      imageKitconfigFixture,
    );
  });

  describe('when instantiated', () => {
    it('should create an ImageKit instance', () => {
      const expectedImageKitOptions: Record<string, string> = {
        privateKey: imageKitconfigFixture.privateKey,
        publicKey: imageKitconfigFixture.publicKey,
        urlEndpoint: imageKitconfigFixture.apiEndpoint,
      };

      expect(ImageKit).toHaveBeenCalledTimes(1);
      expect(ImageKit).toHaveBeenCalledWith(expectedImageKitOptions);
    });
  });

  describe('.uploadbirdImages()', () => {
    beforeAll(() => {
      (ImageKit.prototype.upload as jest.Mock).mockResolvedValue(
        ImagekitUploadResponseFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        try {
          await uploadImageImagekitAdapter.uploadBirdImages(
            BirdCreationQueryFixtures.withMandatory,
          );
        } catch (error) {
          result = error;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should throw an Error', () => {
        expect(result).toBeInstanceOf(Error);
        expect(result).toHaveProperty(
          'message',
          'BirdCreationQuery has no images',
        );
      });
    });

    describe('when called, and Imagekit response is not valid', () => {
      let result: unknown;

      beforeAll(async () => {
        (ImageKit.prototype.upload as jest.Mock).mockResolvedValueOnce({
          response: 'not_valid',
        });

        try {
          await uploadImageImagekitAdapter.uploadBirdImages(
            BirdCreationQueryFixtures.withImage,
          );
        } catch (error) {
          result = error;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should throw an Error', () => {
        expect(result).toBeInstanceOf(Error);
        expect(result).toHaveProperty(
          'message',
          'Imagekit response is not valid',
        );
      });
    });

    describe('having a BirdCreationQuery with one image', () => {
      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result = await uploadImageImagekitAdapter.uploadBirdImages(
            BirdCreationQueryFixtures.withImage,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call ImageKit.upload', () => {
          const expected: UploadOptions = {
            file: BirdCreationQueryFixtures.withImage.images![0] as string,
            fileName: 'no_ring',
            folder: 'local',
          };

          expect(ImageKit.prototype.upload).toHaveBeenCalledTimes(1);
          expect(ImageKit.prototype.upload).toHaveBeenCalledWith(expected);
        });

        it('should return a BirdCreationQuery with Imagekit urls', () => {
          const expected: BirdCreationQuery = {
            ...BirdCreationQueryFixtures.withImage,
            images: [ImagekitUploadResponseFixtures.withMandatory.url],
          };
          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe('having a BirdCreationQuery with one image and ringId', () => {
      describe('when called', () => {
        beforeAll(async () => {
          await uploadImageImagekitAdapter.uploadBirdImages(
            BirdCreationQueryFixtures.withImageAndRingId,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call ImageKit.upload', () => {
          const expected: UploadOptions = {
            file: BirdCreationQueryFixtures.withImage.images![0] as string,
            fileName: 'BIRD-1234',
            folder: 'local/BIRD-1234',
          };

          expect(ImageKit.prototype.upload).toHaveBeenCalledTimes(1);
          expect(ImageKit.prototype.upload).toHaveBeenCalledWith(expected);
        });
      });
    });
  });
});
