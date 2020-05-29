// import all interfaces
import { IBaseRepository } from "./IBaseRepository";
import { injectable } from "inversify";
import {
  Repository,
  getRepository,
  FindOneOptions,
  FindConditions,
  FindManyOptions,
} from "typeorm";

// that class only can be extended
@injectable()
abstract class BaseRepository<T> implements IBaseRepository<T> {
  public _repository!: Repository<any>;
  constructor(repositoryName: string) {
    this._repository = getRepository(repositoryName);
  }

  findOne = async (idEntity: number, includeDeteled: boolean = false, relations : string[] = []): Promise<T> => {
    const obj: any = { id: idEntity };
    if (!includeDeteled) {
      obj.isDeleted = false;
    }
    
    const objConditions : FindOneOptions = { where: [obj] };
    if (relations.length > 0) {
      objConditions.relations = relations;
    }

    let result = <T>await this._repository.findOne(objConditions);
    return result;
  };

  findAll = async (includeDeteled: boolean = false): Promise<T[]> => {
    
    if (!includeDeteled) {
      const objConditions = { where: [ { isDeleted: false } ] };
      const result = <T[]>await this._repository.find(objConditions);
      return result;
    }

    return <T[]>await this._repository.find();
  };

  findObject = async (objQuery: any, includeDeteled: boolean = false, relations : string[] = []): Promise<T> => {
    if (!includeDeteled) {
      objQuery.isDeleted = false;
    }

    const objConditions : FindOneOptions = { where: [objQuery] };
    if (relations.length > 0) {
      objConditions.relations = relations;
    }
    
    let result = <T>await this._repository.findOne(objConditions);
    return result;
  };

  findObjectList = async (objQuery: any, includeDeteled: boolean = false): Promise<T[]> => {

    if (!includeDeteled) {
      objQuery.isDeleted = false;
    }

    const objConditions = { where: [objQuery] };
    let result = <T[]>await this._repository.find(objConditions);
    return result;
  };

  save = async (item: T): Promise<any> => {
    let entity = <any>(<unknown>item);
    if (entity.isDeleted === undefined) {
      entity.isDeleted = false;
    }

    const result = await this._repository.save(entity);
    return result;
  };

  delete = async (idEntity: number): Promise<any> => {
    const obj: any = { id: idEntity };
    let data = await this._repository.findOne(obj);
    data.isDeleted = true;
    const result = await this._repository.save(data);
    return result;
  };
}

export default BaseRepository;
