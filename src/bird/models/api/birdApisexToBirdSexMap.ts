import { BirdSex } from '../domain/BirdSex';
import { BirdApiSex } from './BirdApiSex';

export const birdApiSexToBirdSex: {
  [TKey in BirdApiSex]: BirdSex;
} = {
  [BirdApiSex.female]: BirdSex.female,
  [BirdApiSex.male]: BirdSex.male,
};

export const birdSexToBirdApiSex: {
  [TKey in BirdSex]: BirdApiSex;
} = {
  [BirdSex.female]: BirdApiSex.female,
  [BirdSex.male]: BirdApiSex.male,
};
