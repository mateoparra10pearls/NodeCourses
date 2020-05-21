import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { Category } from "../entity/Category";
import { IBaseService } from "./base/IBaseService";

@injectable()
class CategoryService extends BaseService<Category> implements IBaseService<Category>{
    constructor(@inject(TYPES.CategoryRepository) repo: IBaseRepository<Category>) {
      super(repo);      
    }
}

export { CategoryService };