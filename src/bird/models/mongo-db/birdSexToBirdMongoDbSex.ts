import { BirdSex } from '../domain/BirdSex';
import { BirdMongoDbSex } from './BirdMongoDbSex';

export const birdSexToBirdMongoDbSexMap: {
  [TKey in BirdSex]: BirdMongoDbSex;
} = {
  [BirdSex.female]: BirdMongoDbSex.female,
  [BirdSex.male]: BirdMongoDbSex.male,
};
