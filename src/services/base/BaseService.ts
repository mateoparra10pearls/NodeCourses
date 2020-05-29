import { IBaseService } from "./IBaseService";
import { injectable } from "inversify";
import { IBaseRepository } from "../../repositories/base/IBaseRepository";

@injectable()
abstract class BaseService<T> implements IBaseService<T> {
  public _repository: IBaseRepository<T>;
  constructor(repo: IBaseRepository<T>) {
    this._repository = repo;
  }

  get = async (): Promise<any> => {
    return await this._repository.findAll();
  };

  getOne = async (id: number, includeDeteled: boolean = false, relations : string[] = []): Promise<any> => {
    return await this._repository.findOne(id, includeDeteled, relations);
  };

  save = async (item: T): Promise<any> => {
    return await this._repository.save(item);
  };

  delete = async (id: number): Promise<any> => {
    await this._repository.delete(id);
  };
}

export default BaseService;
