import { BirdApi } from '../../models/api/BirdApi';

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
}
