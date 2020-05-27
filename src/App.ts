import express = require("express");
import * as bodyParser from "body-parser";
import "reflect-metadata";
import morgan = require("morgan");
import { createConnection } from "typeorm";
import { SetResponseObject } from "./shared/middleware/ResponseHandler";

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
      this.app.use(SetResponseObject);
      this.app.use("/api", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
      // console.log(`Sengrid Key: ${process.env.SENDGRID_API_KEY}`);
    });
  }
}

export default App;
