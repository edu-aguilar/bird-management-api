import express from 'express';

import { getServerInfoInteractor } from '../interactors/GetServerInfoInteractor';
import { ServerInfoApi } from '../models/api/ServerInfoApi';
import { ServerInfo } from '../models/domain/ServerInfo';
import { serverInfoToServerInfoApiTransformer } from '../transformer/ServerInfoToServerInfoApiTransformer';

export class GetApiRequestHandler {
  public handler(request: express.Request, response: express.Response): void {
    const serverInfo: ServerInfo = getServerInfoInteractor.interact();

    const serverInfoApi: ServerInfoApi = serverInfoToServerInfoApiTransformer.transform(
      serverInfo,
    );

    response.send(serverInfoApi);
    response.status(200);
  }
}

export const getApiRequestHandler: GetApiRequestHandler = new GetApiRequestHandler();
