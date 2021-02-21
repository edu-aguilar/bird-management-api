import { ServerInfoApi } from '../models/api/ServerInfoApi';
import { ServerInfo } from '../models/domain/ServerInfo';

class ServerInfoToServerInfoApiTransformer {
  public transform(serverInfo: ServerInfo): ServerInfoApi {
    const serverInfoApi: ServerInfoApi = {
      name: serverInfo.name,
      version: serverInfo.version,
    };

    return serverInfoApi;
  }
}

export const serverInfoToServerInfoApiTransformer: ServerInfoToServerInfoApiTransformer = new ServerInfoToServerInfoApiTransformer();
