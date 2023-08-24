import express, { Express } from "express";
import cors from "cors"
import routerAuth from "../routes/auth";
import { conectarBD } from "../dataBase/config";
import routerOrder from "../routes/orders"
import routerIssue from "../routes/issue";

export class Server {
  app: Express;
  port: string | number | undefined;
  authPath: string;
  ordersPath: string;
  issuesPath: string

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/auth";
    this.ordersPath= "/ordenes";
    this.issuesPath= "/issues"
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
    this.app.use(this.ordersPath, routerOrder)
    this.app.use(this.issuesPath, routerIssue)
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`corriendo en el puerto ${this.port}`);
    });
  }
}
