import { isObject } from '../../../utils/isObject';
import { ImagekitUploadResponse } from '../../models/domain/ImagekitUploadResponse';
import { TypeGuard } from './../../../common/models/domain/TypeGuard';

export class ImagekitUploadResponseTypeGuard
  implements TypeGuard<ImagekitUploadResponse> {
  public is(value: unknown): value is ImagekitUploadResponse {
    let isImagekitUploadResponse: boolean = false;

    if (isObject(value)) {
      isImagekitUploadResponse =
        'url' in value &&
        typeof value.url === 'string' &&
        'fileType' in value &&
        typeof value.fileType === 'string' &&
        value.fileType === 'image' &&
        'width' in value &&
        typeof value.width === 'number' &&
        'height' in value &&
        typeof value.height === 'number';
    }

    return isImagekitUploadResponse;
  }
}

export const imagekitUploadResponseTypeGuard: ImagekitUploadResponseTypeGuard = new ImagekitUploadResponseTypeGuard();
