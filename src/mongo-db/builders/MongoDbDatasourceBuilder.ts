import { EnvironmentVariables } from '../../server/models/domain/EnvironmentVariables';
import { EnvironmentLoader } from '../../server/modules/EnvironmentLoader';
import { hasValue } from '../../utils/hasValue';
import { MongoDbConfig } from '../MongoDbConfig';
import { MongoDbDatasource } from './../datasources/MongoDbDatasource';

let mongoDbDatasource: MongoDbDatasource | null = null;

export class MongoDbDatasourceBuilder {
  public build(): MongoDbDatasource {
    if (!hasValue(mongoDbDatasource)) {
      mongoDbDatasource = this.createMongoDbDatasource();
    }

    return mongoDbDatasource;
  }

  private createMongoDbDatasource(): MongoDbDatasource {
    const environmentLoader: EnvironmentLoader = new EnvironmentLoader();

    const environmentVariables: EnvironmentVariables = environmentLoader.load();

    const mongoDbConfig: MongoDbConfig = new MongoDbConfig(
      environmentVariables,
    );

    const mongodbDatasource: MongoDbDatasource = new MongoDbDatasource(
      mongoDbConfig,
    );

    return mongodbDatasource;
  }
}
