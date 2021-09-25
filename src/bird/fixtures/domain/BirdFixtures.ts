import * as url from 'url';

import { Bird } from '../../models/domain/Bird';
import { BirdSex } from '../../models/domain/BirdSex';

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
      sex: null,
      updatedAt: new Date('2021-09-11T13:42:45.066Z'),
    };

    return fixture;
  }

  public static get withAllProperties(): Bird {
    const images: url.URL[] = [
      new url.URL('https://some-url.com/some-path/some-image.jpg'),
    ];

    const fixture: Bird = {
      ...this.withMandatory,
      comments: 'some-comments',
      description: 'some-bird-description',
      images: images,
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
