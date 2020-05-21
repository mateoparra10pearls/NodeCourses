import { injectable, inject, named } from "inversify";
import BaseRepository from "./base/BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { Section } from "../entity/Section";
import { IBaseRepository } from "./base/IBaseRepository";

@injectable()
class SectionRepository extends BaseRepository<Section> implements IBaseRepository<Section>{
    constructor(
      @inject(TYPES.ConfigEntity) @named(Entity.Section) entity: string) {
      super(entity);      
    }
}

export { SectionRepository };