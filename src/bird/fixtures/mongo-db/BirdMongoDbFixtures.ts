import { BirdMongoDb } from '../../models/mongo-db/BirdMongoDb';

export class BirdMongoDbFixtures {
  public static get withMandatory(): BirdMongoDb {
    const fixture: BirdMongoDb = {
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
      updated_at: new Date('2021-09-11T13:42:45.066Z'),
    };

    return fixture;
  }
}
