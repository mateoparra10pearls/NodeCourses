import { injectable, inject, named } from "inversify";
import BaseRepository from "./base/BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { CategoryType } from "../entity/CategoryType";
import { IBaseRepository } from "./base/IBaseRepository";

@injectable()
class CategoryTypeRepository extends BaseRepository<CategoryType> implements IBaseRepository<CategoryType>{
    constructor(
      @inject(TYPES.ConfigEntity) @named(Entity.CategoryType) entity: string) {
      super(entity);      
    }
}

export { CategoryTypeRepository };