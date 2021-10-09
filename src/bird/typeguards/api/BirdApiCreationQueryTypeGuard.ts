import { isObject } from '../../../utils/isObject';
import { BirdApiCreationQuery } from '../../models/api/BirdApiCreationQuery';
import { TypeGuard } from './../../../common/models/domain/TypeGuard';
import { BirdApiSex } from './../../models/api/BirdApiSex';

// TODO implements TypeGuard
export class BirdApiCreationQueryTypeGuard
  implements TypeGuard<BirdApiCreationQuery> {
  public is(value: unknown): value is BirdApiCreationQuery {
    let isBirdApiCreationQuery: boolean = false;

    if (isObject(value)) {
      isBirdApiCreationQuery =
        'born_at' in value && !Number.isNaN(Number(value.born_at));

      if ('comments' in value) {
        isBirdApiCreationQuery =
          isBirdApiCreationQuery && typeof value.comments === 'string';
      }

      if ('description' in value) {
        isBirdApiCreationQuery =
          isBirdApiCreationQuery && typeof value.description === 'string';
      }

      if ('images' in value) {
        isBirdApiCreationQuery =
          isBirdApiCreationQuery &&
          Array.isArray(value.images) &&
          value.images.every((image: unknown) => typeof image === 'string');
      }

      if ('name' in value) {
        isBirdApiCreationQuery =
          isBirdApiCreationQuery && typeof value.name === 'string';
      }

      if ('parents_id' in value) {
        isBirdApiCreationQuery =
          isBirdApiCreationQuery &&
          Array.isArray(value.parents_id) &&
          value.parents_id.every(
            (parentId: unknown) => typeof parentId === 'string',
          );
      }

      if ('partner_id' in value) {
        isBirdApiCreationQuery =
          isBirdApiCreationQuery && typeof value.partner_id === 'string';
      }

      if ('ring_id' in value) {
        isBirdApiCreationQuery =
          isBirdApiCreationQuery && typeof value.ring_id === 'string';
      }

      if ('sex' in value) {
        isBirdApiCreationQuery =
          (isBirdApiCreationQuery &&
            typeof value.sex === 'string' &&
            value.sex === BirdApiSex.female) ||
          value.sex === BirdApiSex.male;
      }
    }

    return isBirdApiCreationQuery;
  }
}

export const birdApiCreationQueryTypeGuard: BirdApiCreationQueryTypeGuard = new BirdApiCreationQueryTypeGuard();
