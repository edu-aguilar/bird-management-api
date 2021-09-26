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
}
