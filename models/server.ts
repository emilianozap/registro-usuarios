import express, { Express } from "express";
import cors from "cors"
import routerAuth from "../routes/auth";
import { conectarBD } from "../dataBase/config";

export class Server {
  app: Express;
  port: string | number | undefined;
  authPath: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT
    this.authPath = "/auth"
    this.conexionaDB();
    this.middlewares();
    this.routes();
  }

  async conexionaDB(): Promise<void> {
    await conectarBD();
  }

  middlewares(): void {
    this.app.use(cors())
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use(this.authPath, routerAuth);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`corriendo en el puerto ${this.port}`);
    });
  }
}
