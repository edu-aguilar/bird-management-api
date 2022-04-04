import { BirdSex } from './BirdSex';

export interface BirdUpdateQuery {
  bornAt?: Date;
  comments?: string;
  description?: string;
  images?: string[];
  name?: string;
  parentsId?: string[];
  partnerId?: string;
  ringId?: string;
  sex?: BirdSex;
}
