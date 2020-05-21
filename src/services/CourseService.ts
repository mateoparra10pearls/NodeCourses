import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";
import { Course } from "../entity/Course";

@injectable()
class CourseService extends BaseService<Course> implements IBaseService<Course>{
    constructor(@inject(TYPES.CourseRepository) repo: IBaseRepository<Course>) {
      super(repo);      
    }
}

export { CourseService };