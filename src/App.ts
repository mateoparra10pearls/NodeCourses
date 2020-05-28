import express = require("express");
import * as bodyParser from "body-parser";
import "reflect-metadata";
import morgan = require("morgan");
import { SetResponseObject } from "./shared/middleware/MiddlewareHandler";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;
    
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }  

  private initializeMiddlewares() {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use("/api", controller.router);
      this.app.use(SetResponseObject);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
