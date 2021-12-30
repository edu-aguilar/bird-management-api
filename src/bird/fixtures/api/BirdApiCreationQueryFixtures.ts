import { BirdApiSex } from '../../models/api/BirdApiSex';
import { BirdApiCreationQuery } from './../../models/api/BirdApiCreationQuery';

export class BirdApiCreationQueryFixtures {
  public static get withMandatory(): BirdApiCreationQuery {
    const fixture: BirdApiCreationQuery = {
      born_at: 1609495200000,
    };

    return fixture;
  }

  public static get withAllProperties(): BirdApiCreationQuery {
    const fixture: BirdApiCreationQuery = {
      ...this.withMandatory,
      comments: 'some-comments',
      description: 'some-bird-description',
      images: ['https://some-url.com/some-path/some-image.jpg'],
      name: 'bird-name',
      parents_id: [
        'ccc1648a-7b1c-4fda-9af9-6ee1345fb663',
        'ab6993d8-d847-4a5e-b7ae-a89702a1243f',
      ],
      partner_id: '11a5589c-f402-4d3b-bd9b-6aeac6279e5f',
      ring_id: 'BIRD-1234',
      sex: BirdApiSex.female,
    };

    return fixture;
  }
}
