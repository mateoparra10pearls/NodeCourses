import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";
import { Section } from "../entity/Section";

@injectable()
class SectionService extends BaseService<Section> implements IBaseService<Section>{
    constructor(@inject(TYPES.RoleRepository) repo: IBaseRepository<Section>) {
      super(repo);      
    }
}

export { SectionService };