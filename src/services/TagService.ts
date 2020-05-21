import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";
import { Tag } from "../entity/Tag";

@injectable()
class TagService extends BaseService<Tag> implements IBaseService<Tag>{
    constructor(@inject(TYPES.TagRepository) repo: IBaseRepository<Tag>) {
      super(repo);      
    }
}

export { TagService };