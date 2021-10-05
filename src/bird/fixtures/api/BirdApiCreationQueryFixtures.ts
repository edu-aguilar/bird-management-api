import { BirdApiCreationQuery } from './../../models/api/BirdApiCreationQuery';

export class BirdApiCreationQueryFixtures {
  public static get withMandatory(): BirdApiCreationQuery {
    const fixture: BirdApiCreationQuery = {
      born_at: 1633416813805,
    };

    return fixture;
  }
}
