import { IConnectionApp } from "../interfaces/IConnectionApp";
import { Connection, getConnection, Repository } from "typeorm";
import { injectable } from "inversify";

@injectable()
class ConnectionApp implements IConnectionApp { // Not exported
    constructor () {}
  
    async getEntityRepository(repoName : string): Promise<Repository<any>> {
        const conn = await getConnection();
        const repo = await conn.getRepository(repoName);
        return repo;
    };
  }

  export default ConnectionApp;