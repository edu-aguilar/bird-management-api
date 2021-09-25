import { BirdSex } from '../domain/BirdSex';
import { BirdMongoDbSex } from './BirdMongoDbSex';

export const birdMongoDbSexToBirdSexMap: {
  [TKey in BirdMongoDbSex]: BirdSex;
} = {
  [BirdMongoDbSex.female]: BirdSex.female,
  [BirdMongoDbSex.male]: BirdSex.male,
};
