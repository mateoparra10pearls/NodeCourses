import { injectable, inject, named } from "inversify";
import BaseRepository from "./base/BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { Role } from "../entity/Role";
import { IBaseRepository } from "./base/IBaseRepository";

@injectable()
class RoleRepository extends BaseRepository<Role> implements IBaseRepository<Role>{
    constructor(
      @inject(TYPES.ConfigEntity) @named(Entity.Role) entity: string) {
      super(entity);      
    }
}

export { RoleRepository };