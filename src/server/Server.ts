import express from 'express';

import { PostBirdRequestHandler } from '../bird/request-handlers/postBirdRequestHandler';
import { PutBirdRequestHandler } from '../bird/request-handlers/putBirdRequestHandler';
import { getApiRequestHandler } from './request-handler/GetApiRequestHandler';

export class Server {
  private readonly app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());

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

  private setupEndpoints(): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.app.route('/').get(getApiRequestHandler.handler);

    const postBirdRequestHandler: PostBirdRequestHandler =
      new PostBirdRequestHandler();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.app
      .route('/birds')
      .post(postBirdRequestHandler.handler.bind(postBirdRequestHandler));

    const putBirdRequestHandler: PutBirdRequestHandler =
      new PutBirdRequestHandler();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.app
      .route('/birds/:id')
      .put(putBirdRequestHandler.handler.bind(putBirdRequestHandler));
  }
}
