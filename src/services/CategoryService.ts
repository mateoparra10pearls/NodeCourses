import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { Category } from "../entity/Category";
import { ICategoryService } from "./interfaces/ICategoryService";

@injectable()
class CategoryService extends BaseService<Category> implements ICategoryService{
    constructor(@inject(TYPES.CategoryRepository) repo: IBaseRepository<Category>) {
      super(repo);      
    }

    save = async (category: Category) => {
      let categoryDb = <Category>await this._repository.findObject({ name: category.name! });
      if (categoryDb) {
        category.id = categoryDb.id;
      }
      
      const result = <Category>await this._repository.save(category);
      return result;
    }; 
}

export { CategoryService };