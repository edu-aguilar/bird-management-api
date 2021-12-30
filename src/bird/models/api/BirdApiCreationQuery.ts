import { BirdApiSex } from './BirdApiSex';

export interface BirdApiCreationQuery {
  born_at: number;
  comments?: string;
  description?: string;
  images?: string[];
  name?: string;
  parents_id?: string[];
  partner_id?: string;
  ring_id?: string;
  sex?: BirdApiSex;
}
