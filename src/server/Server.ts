import express from 'express';

import { GetApiRequestHandler } from './request-handler/GetApiRequestHandler';

export class Server {
  private readonly app: express.Express;
  private readonly getApiRequestHandler: GetApiRequestHandler;

  constructor() {
    this.getApiRequestHandler = new GetApiRequestHandler();

    this.app = express();
    this.setupEndpoints();
  }

  public async start(port: number): Promise<number> {
    return new Promise(
      (
        resolve: (port: number) => void,
        reject: (error: unknown) => void,
      ): void => {
        this.app
          .listen(port, () => {
            resolve(port);
          })
          .on('error', (err: unknown) => reject(err));
      },
    );
  }

  private setupEndpoints() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.app.route('/').get(this.getApiRequestHandler.handler);
  }
}
