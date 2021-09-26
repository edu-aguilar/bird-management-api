import express from 'express';

import { getServerInfoInteractor } from '../interactors/GetServerInfoInteractor';
import { ServerInfoApi } from '../models/api/ServerInfoApi';
import { ServerInfo } from '../models/domain/ServerInfo';
import { serverInfoToServerInfoApiTransformer } from '../transformer/ServerInfoToServerInfoApiTransformer';

export class GetApiRequestHandler {
  public async handler(
    request: express.Request,
    response: express.Response,
  ): Promise<void> {
    const serverInfo: ServerInfo = await getServerInfoInteractor.interact();

    const serverInfoApi: ServerInfoApi = serverInfoToServerInfoApiTransformer.transform(
      serverInfo,
    );

    response.send(serverInfoApi);
    response.status(200);
  }
}

export const getApiRequestHandler: GetApiRequestHandler = new GetApiRequestHandler();
