import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { hasValue } from '../../utils/hasValue';
import { isObject } from '../../utils/isObject';
import { UpdateOneBirdInteractor } from '../interactors/UpdateOneBirdInteractor';
import { BirdApi } from '../models/api/BirdApi';
import { BirdApiSex } from '../models/api/BirdApiSex';
import { BirdApiUpdateQuery } from '../models/api/BirdApiUpdateQuery';
import { Bird } from '../models/domain/Bird';
import { BirdUpdateQuery } from '../models/domain/BirdUpdateQuery';
import { BirdApiUpdateQueryToBirdUpdateQueryTransformer } from '../transformers/api/BirdApiUpdateQueryToBirdUpdateQueryTransformer';
import { BirdToBirdApiTransformer } from '../transformers/api/BirdToBirdApiTransformer';

export class PutBirdRequestHandler {
  constructor(
    private readonly birdApiUpdateQueryToBirdUpdateQueryTransformer: BirdApiUpdateQueryToBirdUpdateQueryTransformer = new BirdApiUpdateQueryToBirdUpdateQueryTransformer(),
    private readonly updateOneBirdInteractor: UpdateOneBirdInteractor = new UpdateOneBirdInteractor(),
    private readonly birdToBirdApiTransformer: BirdToBirdApiTransformer = new BirdToBirdApiTransformer(),
  ) {}

  public async handler(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    const body: unknown = request.body;
    const birdId: string = request.params.id as string;

    if (this.isBirdApiUpdateQueryTypeguard(body)) {
      try {
        const birdUpdateQuery: BirdUpdateQuery =
          await this.birdApiUpdateQueryToBirdUpdateQueryTransformer.transform(
            body,
          );

        const bird: Bird = await this.updateOneBirdInteractor.interact(
          birdId,
          birdUpdateQuery,
        );

        const birdApi: BirdApi = await this.birdToBirdApiTransformer.transform(
          bird,
        );

        response.status(StatusCodes.OK);
        response.send(birdApi);
      } catch (error: unknown) {
        next(error);
      }
    } else {
      next('update query is not valid');
    }
  }

  private isBirdApiUpdateQueryTypeguard(
    value: unknown,
  ): value is BirdApiUpdateQuery {
    let isBirdApiCreationQuery: boolean = false;

    if (isObject(value)) {
      isBirdApiCreationQuery =
        'born_at' in value && !Number.isNaN(Number(value.born_at));

      if ('comments' in value) {
        isBirdApiCreationQuery = typeof value.comments === 'string';
      }

      if ('description' in value) {
        isBirdApiCreationQuery = typeof value.description === 'string';
      }

      if ('images' in value) {
        isBirdApiCreationQuery =
          Array.isArray(value.images) &&
          value.images.every((image: unknown) => typeof image === 'string');
      }

      if ('name' in value) {
        isBirdApiCreationQuery = typeof value.name === 'string';
      }

      if ('parents_id' in value) {
        isBirdApiCreationQuery =
          Array.isArray(value.parents_id) &&
          value.parents_id.every(
            (parentId: unknown) => typeof parentId === 'string',
          );
      }

      if ('partner_id' in value) {
        isBirdApiCreationQuery = typeof value.partner_id === 'string';
      }

      if ('ring_id' in value) {
        isBirdApiCreationQuery = typeof value.ring_id === 'string';
      }

      if ('sex' in value) {
        isBirdApiCreationQuery =
          (typeof value.sex === 'string' && value.sex === BirdApiSex.female) ||
          value.sex === BirdApiSex.male;
      }
    }

    return isBirdApiCreationQuery;
  }
}
