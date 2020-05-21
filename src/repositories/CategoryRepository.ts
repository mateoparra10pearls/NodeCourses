import { injectable, inject, named } from "inversify";
import BaseRepository from "./base/BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { Category } from "../entity/Category";
import { IBaseRepository } from "./base/IBaseRepository";

@injectable()
class CategoryRepository extends BaseRepository<Category> implements IBaseRepository<Category>{
    constructor(
      @inject(TYPES.ConfigEntity) @named(Entity.Category) entity: string) {
      super(entity);      
    }
}

export { CategoryRepository };