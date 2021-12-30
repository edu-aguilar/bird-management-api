import { BirdApi } from '../../models/api/BirdApi';
import { BirdApiSex } from '../../models/api/BirdApiSex';

export class BirdApiFixtures {
  public static get withMandatory(): BirdApi {
    const fixture: BirdApi = {
      born_at: 1609495200000,
      comments: null,
      created_at: 1631367765066,
      description: null,
      id: '9a29ae28-3653-441c-b1ab-9772ec25d5fe',
      images: null,
      name: null,
      parents_id: null,
      partner_id: null,
      ring_id: null,
      sex: null,
      updated_at: 1631367765066,
    };

    return fixture;
  }

  public static get withAllProperties(): BirdApi {
    const fixture: BirdApi = {
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
