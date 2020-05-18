// import all interfaces
import { IBaseRepository } from "./interfaces/IBaseRepository";
import { IConnectionApp } from "./interfaces/IConnection";
import { injectable, inject, unmanaged, named } from "inversify";
import { TYPES } from "../shared/Types";
import { Entity } from "../shared/Constants";
import {
  Repository,
  getRepository,
  Connection,
  createConnection,
} from "typeorm";

// that class only can be extended
@injectable()
abstract class BaseRepository<T> implements IBaseRepository<T> {
  private _connectionApp: IConnectionApp;
  private _repositoryName: string;
  constructor(connectionApp: IConnectionApp, repositoryName: string) {
    this._connectionApp = connectionApp;
    this._repositoryName = repositoryName;
  }

  create(item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async find(item: T): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  findOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }

  findAll = async (): Promise<T[]> => {
    const connection = await this._connectionApp.getConnection();
    const repo = <Repository<any>>(
      await connection.getRepository(this._repositoryName)
    );
    // let data = <T[]>await connection.getRepository(this._repositoryName).find();
    // await connection.close();
    //const repo = getRepository(this._repositoryName);
    let data = <T[]>await repo.find();
    console.log(`data: ${data}`);
    await connection.close();
    return data;
  };
}

export default BaseRepository;
