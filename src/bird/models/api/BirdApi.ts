import { EntityApi } from '../../../common/models/api/EntityApi';
import { BirdApiSex } from './BirdApiSex';

export interface BirdApi extends EntityApi {
  born_at: number;
  comments: string | null;
  description: string | null;
  images: string[] | null;
  name: string | null;
  parents_id: string[] | null;
  partner_id: string | null;
  ring_id: string | null;
  sex: BirdApiSex | null;
}
