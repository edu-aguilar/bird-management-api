import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { Bird } from '../models/domain/Bird';
import { BirdCreationQuery } from '../models/domain/BirdCreationQuery';
import { birdApiCreationQueryToBirdCreationQueryTransformer } from '../transformers/api/BirdApiCreationQueryToBirdCreationQueryTransformer';
import { birdApiCreationQueryTypeGuard } from '../typeguards/api/BirdApiCreationQueryTypeGuard';
import { createOneBirdInteractor } from './../interactors/CreateOneBirdInteractor';
import { BirdApi } from './../models/api/BirdApi';
import { birdToBirdApiTransformer } from './../transformers/api/BirdToBirdApiTransformer';

export class PostBirdRequestHandler {
  public async handler(
    request: express.Request,
    response: express.Response,
  ): Promise<void> {
    const body: unknown = request.body;

    if (birdApiCreationQueryTypeGuard.is(body)) {
      const birdCreationQuery: BirdCreationQuery = await birdApiCreationQueryToBirdCreationQueryTransformer.transform(
        body,
      );

      const bird: Bird = await createOneBirdInteractor.interact(
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

export const postBirdRequestHandler: PostBirdRequestHandler = new PostBirdRequestHandler();
