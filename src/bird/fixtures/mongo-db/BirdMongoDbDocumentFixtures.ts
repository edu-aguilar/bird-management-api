import { BirdMongoDbSex } from '../../models/mongo-db/BirdMongoDbSex';
import { BirdMongoDbDocument } from './../../models/mongo-db/BirdMongoDbDocument';

export class BirdMongoDbDocumentFixtures {
  public static get withMandatory(): BirdMongoDbDocument {
    const fixture: BirdMongoDbDocument = {
      _id: '9a29ae28-3653-441c-b1ab-9772ec25d5fe',
      born_at: new Date('2021-01-01T10:00:00.000Z'),
      comments: null,
      created_at: new Date('2021-09-11T13:42:45.066Z'),
      description: null,
      images: null,
      name: null,
      parents_id: null,
      partner_id: null,
      ring_id: null,
      sex: null,
      updated_at: new Date('2021-09-11T13:42:45.066Z'),
    };

    return fixture;
  }

  public static get withAllProperties(): BirdMongoDbDocument {
    const fixture: BirdMongoDbDocument = {
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
      sex: BirdMongoDbSex.female,
    };

    return fixture;
  }
}
