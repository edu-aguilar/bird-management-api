import { Bird } from '../../models/domain/Bird';

export class BirdFixtures {
  public static get withMandatory(): Bird {
    const fixture: Bird = {
      bornAt: new Date('2021-01-01T10:00:00.000Z'),
      comments: null,
      createdAt: new Date('2021-09-11T13:42:45.066Z'),
      description: null,
      id: '9a29ae28-3653-441c-b1ab-9772ec25d5fe',
      images: null,
      name: null,
      parentsId: null,
      partnerId: null,
      ringId: null,
      updatedAt: new Date('2021-09-11T13:42:45.066Z'),
    };

    return fixture;
  }
}
