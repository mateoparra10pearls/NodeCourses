import { injectable, inject, named } from "inversify";
import BaseRepository from "./base/BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { UserSection } from "../entity/UserSection";
import { IBaseRepository } from "./base/IBaseRepository";

@injectable()
class UserSectionRepository extends BaseRepository<UserSection> implements IBaseRepository<UserSection>{
    constructor(
      @inject(TYPES.ConfigEntity) @named(Entity.UserSection) entity: string) {
      super(entity);      
    }
}

export { UserSectionRepository };