import { getServerInfoNpmAdapter } from '../adapters/npm/GetServerInfoNpmAdapter';
import { ServerInfo } from '../models/domain/ServerInfo';

class GetServerInfoInteractor {
  public interact(): ServerInfo {
    const serverInfo: ServerInfo = getServerInfoNpmAdapter.getServerInfo();

    return serverInfo;
  }
}

export const getServerInfoInteractor: GetServerInfoInteractor = new GetServerInfoInteractor();
