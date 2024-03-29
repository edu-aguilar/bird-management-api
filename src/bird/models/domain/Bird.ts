import url from 'url';

import { Entity } from './../../../common/models/domain/Entity';
import { BirdSex } from './BirdSex';

export interface Bird extends Entity {
  bornAt: Date;
  comments: string | null;
  description: string | null;
  images: url.URL[] | null;
  name: string | null;
  parentsId: string[] | null;
  partnerId: string | null;
  ringId: string | null;
  sex: BirdSex | null;
}
