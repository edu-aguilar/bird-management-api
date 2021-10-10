import { BirdSex } from '../../models/domain/BirdSex';
import { BirdCreationQuery } from './../../models/domain/BirdCreationQuery';

export class BirdCreationQueryFixtures {
  public static get withMandatory(): BirdCreationQuery {
    const fixture: BirdCreationQuery = {
      bornAt: new Date('2021-01-01T10:00:00.000Z'),
      comments: null,
      description: null,
      images: null,
      name: null,
      parentsId: null,
      partnerId: null,
      ringId: null,
      sex: null,
    };

    return fixture;
  }

  public static get withAllProperties(): BirdCreationQuery {
    const fixture: BirdCreationQuery = {
      ...this.withMandatory,
      comments: 'some-comments',
      description: 'some-bird-description',
      images: ['https://some-url.com/some-path/some-image.jpg'],
      name: 'bird-name',
      parentsId: [
        'ccc1648a-7b1c-4fda-9af9-6ee1345fb663',
        'ab6993d8-d847-4a5e-b7ae-a89702a1243f',
      ],
      partnerId: '11a5589c-f402-4d3b-bd9b-6aeac6279e5f',
      ringId: 'BIRD-1234',
      sex: BirdSex.female,
    };

    return fixture;
  }
}
