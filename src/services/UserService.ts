import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { User } from "../entity/User";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";
import { Hash } from "../entity/Hash";
import { IHashService } from "./interfaces/IHashService";
import { EntityEnum } from "../shared/enums/EntityEnum";


@injectable()
class UserService extends BaseService<User> implements IBaseService<User>{
    private _hashService: IHashService;
    constructor(@inject(TYPES.UserRepository) repo: IBaseRepository<User>,
    @inject(TYPES.HashService) hashService: IHashService) {
      super(repo);      
      this._hashService = hashService;
    }

    get = async () => {
      const setR = <Hash>await this.createHash();
      const getR = await this.getHashInfo(setR.hashCode);
      return await this._repository.findAll();
    }

    createHash = async () : Promise<any> => {
      const result = await this._hashService.createHash(1, EntityEnum.Role);
      console.log("Created Hash: " + JSON.stringify(result));
      return result;      
    }

    async getHashInfo(hashCode: string) : Promise<any> {
      const result = await this._hashService.getHashInfo(hashCode);
      console.log("Info Hash: " + JSON.stringify(result));
      return result;      
    }
}

export { UserService };