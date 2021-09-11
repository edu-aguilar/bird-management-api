import { Entity } from './../../../common/models/domain/Entity';

export interface Bird extends Entity {
  bornAt: Date;
  comments: string | null;
  description: string | null;
  images: string[] | null;
  parentsId: string[] | null;
  partnerId: string | null;
  ringId: string | null;
  name: string | null;
}
