import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";
import { CourseTag } from "../entity/CourseTag";

@injectable()
class CourseTagService extends BaseService<CourseTag> implements IBaseService<CourseTag>{
    constructor(@inject(TYPES.CourseTagRepository) repo: IBaseRepository<CourseTag>) {
      super(repo);      
    }
}

export { CourseTagService };