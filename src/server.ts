import express from "express";

export class Server {
  private app: express.Express;

  constructor() {
    this.app = express();
  }

  public start(port: number) {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  }
}
