// import all interfaces
import { IBaseRepository } from "./interfaces/IBaseRepository";
import { IConnectionApp } from "../shared/interfaces/IConnectionApp";
import { injectable, unmanaged } from "inversify";
import { Connection, Repository } from "typeorm";

// that class only can be extended
@injectable()
abstract class BaseRepository<T> implements IBaseRepository<T> {
  private _connectionApp: IConnectionApp;
  private _repository!: Repository<any>;
  constructor(
    connectionApp: IConnectionApp, 
    repositoryName: string) {
    this._connectionApp = connectionApp;
    this._connectionApp.getEntityRepository(repositoryName).then((repo) => this._repository = repo);
  }

  create = async (item: T): Promise<boolean> => {
    await this._repository.save(item);
    return false;
  }

  update = async (id: number, item: T): Promise<boolean>  => {
    let data = await this._repository.findOne(id);
    if (data) {    
      await this._repository.save(data);
      return true;
    }

    return false;
  }
  
  delete = async (id: number) => {
    let data = await this._repository.findOne(id);
    data.isDeleted = true;
    await this._repository.save(data);
  }

  findOne = async (id: number): Promise<T> => {    
    let data = <T>await this._repository.findOne(id);
    return data;
  }

  findAll = async (): Promise<T[]> => {
    let data = <T[]>await this._repository.find();
    return data;
  };
}

export default BaseRepository;
