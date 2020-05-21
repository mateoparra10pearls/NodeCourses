import { injectable, inject, named } from "inversify";
import BaseRepository from "./base/BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { CourseTag } from "../entity/CourseTag";
import { IBaseRepository } from "./base/IBaseRepository";

@injectable()
class CourseTagRepository extends BaseRepository<CourseTag> implements IBaseRepository<CourseTag>{
    constructor(
      @inject(TYPES.ConfigEntity) @named(Entity.CourseTag) entity: string) {
      super(entity);      
    }
}

export { CourseTagRepository };