import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";
import { CategoryType } from "../entity/CategoryType";

@injectable()
class CategoryTypeService extends BaseService<CategoryType> implements IBaseService<CategoryType>{
    constructor(@inject(TYPES.CategoryTypeRepository) repo: IBaseRepository<CategoryType>) {
      super(repo);      
    }
}

export { CategoryTypeService };