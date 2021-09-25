import { EntityMongoDb } from '../../../common/models/mongo-db/EntityMongoDb';
import { BirdMongoDbSex } from './BirdMongoDbSex';

export interface BirdMongoDbBaseDocument extends EntityMongoDb {
  born_at: Date;
  comments: string | null;
  description: string | null;
  images: string[] | null;
  parents_id: string[] | null;
  partner_id: string | null;
  ring_id: string | null;
  sex: BirdMongoDbSex | null;
  name: string | null;
}
