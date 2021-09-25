import { ServerInfo } from '../../models/domain/ServerInfo';

export class ServerInfoFixtures {
  public static get withMandatory(): ServerInfo {
    const fixture: ServerInfo = {
      name: 'server-name',
      version: '0.0.0',
    };

    return fixture;
  }
}
