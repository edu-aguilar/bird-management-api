import { ImagekitUploadResponse } from '../../models/domain/ImagekitUploadResponse';

export class ImagekitUploadResponseFixtures {
  public static get withMandatory(): ImagekitUploadResponse {
    const fixture: ImagekitUploadResponse = {
      fileType: 'image',
      height: 200,
      url: 'https://ik.imagekit.io/cdascda/local/from-node_2YJGt5-1e',
      width: 200,
    };

    return fixture;
  }
}
