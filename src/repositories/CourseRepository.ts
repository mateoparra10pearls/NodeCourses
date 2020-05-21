import { injectable, inject, named } from "inversify";
import BaseRepository from "./base/BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { Course } from "../entity/Course";
import { IBaseRepository } from "./base/IBaseRepository";

@injectable()
class CourseRepository extends BaseRepository<Course> implements IBaseRepository<Course>{
    constructor(
      @inject(TYPES.ConfigEntity) @named(Entity.Course) entity: string) {
      super(entity);      
    }
}

export { CourseRepository };