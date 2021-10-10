import url from 'url';

import { BirdCreationQuery } from '../models/domain/BirdCreationQuery';

export interface UploadBirdImageAdapter {
  uploadBirdImage(birdCreationQuery: BirdCreationQuery): Promise<url.URL>;
}
