import { IConnectionApp } from "../repositories/interfaces/IConnection";
import { Connection, createConnection } from "typeorm";
import { injectable } from "inversify";

@injectable()
class ConnectionApp implements IConnectionApp { // Not exported
    constructor () {}
  
    getConnection(): Promise<Connection> {
        return createConnection();
    };
  }

  export default ConnectionApp;