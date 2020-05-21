import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";
import { UserSection } from "../entity/UserSection";

@injectable()
class UserSectionService extends BaseService<UserSection> implements IBaseService<UserSection>{
    constructor(@inject(TYPES.UserSectionRepository) repo: IBaseRepository<UserSection>) {
      super(repo);      
    }
}

export { UserSectionService };