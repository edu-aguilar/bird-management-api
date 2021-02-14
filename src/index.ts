import { Server } from "./Server";

const PORT: number = 3000;

const server: Server = new Server();

server
  .start(PORT)
  .then((port: number) => {
    console.log(`Server running at port ${port}`);
  })
  .catch((err: unknown) => {
    console.log(`Error starting server: ${JSON.stringify(err)}`);
  });
