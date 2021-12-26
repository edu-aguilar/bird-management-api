import ImageKit from 'imagekit';
import {
  ImageKitOptions,
  UploadOptions,
  UploadResponse,
} from 'imagekit/dist/libs/interfaces';

import { UploadBirdImageAdapter } from '../../../bird/adapters/UploadBirdImageAdapter';
import { BirdCreationQuery } from '../../../bird/models/domain/BirdCreationQuery';
import { imagekitUploadResponseTypeGuard } from '../../../imagekit/typeguards/domain/ImagekitUploadResponseTypeGuard';
import { hasValue } from '../../../utils/hasValue';
import { ImagekitConfig } from './../../../imagekit/ImagekitConfig';

export class UploadImageImagekitAdapter implements UploadBirdImageAdapter {
  private readonly folder: string;
  private readonly imageKitInstance: ImageKit;

  constructor(imagekitConfig: ImagekitConfig) {
    const imageKitOptions: ImageKitOptions = {
      privateKey: imagekitConfig.privateKey,
      publicKey: imagekitConfig.publicKey,
      urlEndpoint: imagekitConfig.apiEndpoint,
    };

    this.folder = imagekitConfig.environment;
    this.imageKitInstance = new ImageKit(imageKitOptions);
  }

  public async uploadBirdImages(
    birdCreationQuery: BirdCreationQuery,
  ): Promise<BirdCreationQuery> {
    const uploadOptions: UploadOptions[] = this.composeImagekitUploadOptions(
      birdCreationQuery,
    );

    const uploadResponsePromises: Promise<UploadResponse>[] = uploadOptions.map(
      async (uploadOption: UploadOptions): Promise<UploadResponse> => {
        return this.imageKitInstance.upload(uploadOption);
      },
    );

    let uploadResponses: UploadResponse[] = [];

    uploadResponses = await Promise.all(uploadResponsePromises);

    const areUploadResponsesValid: boolean = uploadResponses.every(
      (uploadResponse: UploadResponse) =>
        imagekitUploadResponseTypeGuard.is(uploadResponse),
    );

    if (areUploadResponsesValid) {
      const updatedBirdCreationQuery: BirdCreationQuery = {
        ...birdCreationQuery,
      };

      updatedBirdCreationQuery.images = uploadResponses.map(
        (uploadResponse: UploadResponse) => uploadResponse.url,
      );

      return updatedBirdCreationQuery;
    } else {
      throw new Error('Imagekit response is not valid');
    }
  }

  private composeImagekitUploadOptions(
    birdCreationQuery: BirdCreationQuery,
  ): UploadOptions[] {
    if (!hasValue(birdCreationQuery.images)) {
      throw new Error('BirdCreationQuery has no images');
    }

    const uploadOptions: UploadOptions[] = [];

    let fileName: string = 'no_ring';
    let folder: string = this.folder;

    if (hasValue(birdCreationQuery.ringId)) {
      fileName = birdCreationQuery.ringId;
      folder += `/${birdCreationQuery.ringId}`;
    }

    for (const image of birdCreationQuery.images) {
      const uploadOption: UploadOptions = {
        file: image,
        fileName: fileName,
        folder: folder,
      };

      uploadOptions.push(uploadOption);
    }

    return uploadOptions;
  }
}
