import { BirdSex } from '../domain/BirdSex';
import { BirdApiSex } from './BirdApiSex';

export const birdApisexToBirdSex: {
  [TKey in BirdApiSex]: BirdSex;
} = {
  [BirdApiSex.female]: BirdSex.female,
  [BirdApiSex.male]: BirdSex.male,
};
