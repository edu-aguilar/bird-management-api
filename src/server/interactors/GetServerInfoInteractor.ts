import { getServerInfoNpmAdapter } from '../adapters/npm/GetServerInfoNpmAdapter';
import { ServerInfo } from '../models/domain/ServerInfo';
import { Interactor } from './../../common/models/domain/Interactor';

export class GetServerInfoInteractor implements Interactor<void, ServerInfo> {
  public async interact(): Promise<ServerInfo> {
    const serverInfo: ServerInfo = getServerInfoNpmAdapter.getServerInfo();

    return serverInfo;
  }
}

export const getServerInfoInteractor: GetServerInfoInteractor = new GetServerInfoInteractor();
