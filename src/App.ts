import express = require("express");
import * as bodyParser from 'body-parser';
import authRoutes from "./routes/Auth";
import "reflect-metadata";
import morgan = require("morgan");

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers:any, port: number) {
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
        controllers.forEach((controller:any) => {
            this.app.use("/", controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
