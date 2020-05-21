import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { User } from "../entity/User";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";

@injectable()
class UserService extends BaseService<User> implements IBaseService<User>{
    constructor(@inject(TYPES.UserRepository) repo: IBaseRepository<User>) {
      super(repo);      
    }
}

export { UserService };