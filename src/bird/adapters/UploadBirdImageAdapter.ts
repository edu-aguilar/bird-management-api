import url from 'url';

import { BirdCreationQuery } from '../models/domain/BirdCreationQuery';

export interface UploadBirdImageAdapter {
  uploadBirdImages(
    birdCreationQuery: BirdCreationQuery,
  ): Promise<BirdCreationQuery>;
}
