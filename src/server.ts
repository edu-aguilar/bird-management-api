import express from 'express';

export class Server {
  private readonly app: express.Express;

  constructor() {
    this.app = express();
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
}
