import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { MongoDbDatasourceBuilder } from '../../mongo-db/builders/MongoDbDatasourceBuilder';
import { BirdCreateOneMongoDbAdapter } from '../adapters/mongo-db/BirdCreateOneMongoDbAdapter';
import { Bird } from '../models/domain/Bird';
import { BirdCreationQuery } from '../models/domain/BirdCreationQuery';
import { birdApiCreationQueryToBirdCreationQueryTransformer } from '../transformers/api/BirdApiCreationQueryToBirdCreationQueryTransformer';
import { birdApiCreationQueryTypeGuard } from '../typeguards/api/BirdApiCreationQueryTypeGuard';
import { MongoDbDatasource } from './../../mongo-db/datasources/MongoDbDatasource';
import { EnvironmentLoader } from './../../server/modules/EnvironmentLoader';
import { CreateOneBirdInteractor } from './../interactors/CreateOneBirdInteractor';
import { BirdApi } from './../models/api/BirdApi';
import { birdToBirdApiTransformer } from './../transformers/api/BirdToBirdApiTransformer';

export class PostBirdRequestHandler {
  private readonly createOneBirdInteractor: CreateOneBirdInteractor;

  constructor() {
    const environmentLoader: EnvironmentLoader = new EnvironmentLoader();
    const mongoDbDatasource: MongoDbDatasource = new MongoDbDatasourceBuilder().build();

    const birdCreateOneMongoDbAdapter: BirdCreateOneMongoDbAdapter = new BirdCreateOneMongoDbAdapter(
      mongoDbDatasource,
    );
    this.createOneBirdInteractor = new CreateOneBirdInteractor(
      birdCreateOneMongoDbAdapter,
      environmentLoader,
    );
  }

  public async handler(
    request: express.Request,
    response: express.Response,
  ): Promise<void> {
    const body: unknown = request.body;

    if (birdApiCreationQueryTypeGuard.is(body)) {
      const birdCreationQuery: BirdCreationQuery = await birdApiCreationQueryToBirdCreationQueryTransformer.transform(
        body,
      );

      const bird: Bird = await this.createOneBirdInteractor.interact(
        birdCreationQuery,
      );

      const birdApi: BirdApi = await birdToBirdApiTransformer.transform(bird);

      response.status(StatusCodes.CREATED);
      response.send(birdApi);
    } else {
      throw new Error('Body not valid');
    }
  }
}
