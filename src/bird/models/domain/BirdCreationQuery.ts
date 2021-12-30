import { BirdSex } from './BirdSex';

export interface BirdCreationQuery {
  bornAt: Date;
  comments: string | null;
  description: string | null;
  images: string[] | null;
  name: string | null;
  parentsId: string[] | null;
  partnerId: string | null;
  ringId: string | null;
  sex: BirdSex | null;
}
