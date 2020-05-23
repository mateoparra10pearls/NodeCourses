// import all interfaces
import { IBaseRepository } from "./IBaseRepository";
import { injectable } from "inversify";
import { Repository, getRepository } from "typeorm";

// that class only can be extended
@injectable()
abstract class BaseRepository<T> implements IBaseRepository<T> {
    public _repository!: Repository<any>;
  constructor(
    repositoryName: string) {
    this._repository = getRepository(repositoryName);
  }

  save = async (item: T): Promise<any> => {
    let entity = <any><unknown>item;
    if (entity.isDeleted === undefined) {
      entity.isDeleted = false;
    }    

    const result = await this._repository.save(entity);
    return result;
  }
  
  delete = async (id: number): Promise<any> =>  {
    let data = await this._repository.findOne(id);
    data.isDeleted = true;
    const result = await this._repository.save(data);
    return result;
  }

  findOne = async (id: number): Promise<T> => {    
    let result = <T>await this._repository.findOne(id);
    return result;
  }

  findAll = async (): Promise<T[]> => {
    let result = <T[]>await this._repository.find();
    return result;
  };

  findObject = async(obj: any): Promise<T[]> => {
    let result = <T[]>await this._repository.find(obj);
    return result;
  }
}

export default BaseRepository;
