import { injectable, inject, named } from "inversify";
import BaseRepository from "./base/BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { Tag } from "../entity/Tag";
import { IBaseRepository } from "./base/IBaseRepository";

@injectable()
class TagRepository extends BaseRepository<Tag> implements IBaseRepository<Tag>{
    constructor(
      @inject(TYPES.ConfigEntity) @named(Entity.Tag) entity: string) {
      super(entity);      
    }
}

export { TagRepository };