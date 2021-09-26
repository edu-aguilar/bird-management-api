jest.mock('../adapters/npm/GetServerInfoNpmAdapter');

import { getServerInfoNpmAdapter } from '../adapters/npm/GetServerInfoNpmAdapter';
import { ServerInfoFixtures } from './../fixtures/domain/ServerInfoFixtures';
import { GetServerInfoInteractor } from './GetServerInfoInteractor';

describe('GetServerInfoInteractor', () => {
  let getServerInfoInteractor: GetServerInfoInteractor;

  beforeAll(() => {
    getServerInfoInteractor = new GetServerInfoInteractor();
  });

  describe('.interact()', () => {
    beforeAll(() => {
      (getServerInfoNpmAdapter.getServerInfo as jest.Mock).mockReturnValue(
        ServerInfoFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await getServerInfoInteractor.interact();
      });

      it('should call GetServerInfoNpmAdapter.getServerInfo', () => {
        expect(getServerInfoNpmAdapter.getServerInfo).toHaveBeenCalledTimes(1);
        expect(getServerInfoNpmAdapter.getServerInfo).toHaveBeenCalledWith();
      });

      it('should return a ServerInfo', () => {
        expect(result).toStrictEqual(ServerInfoFixtures.withMandatory);
      });
    });
  });
});
