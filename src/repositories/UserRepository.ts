import { User } from "../entity/User"
import { injectable, inject, named } from "inversify";
import BaseRepository from "./base/BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { IBaseRepository } from "./base/IBaseRepository";

@injectable()
class UserRepository extends BaseRepository<User> implements IBaseRepository<User> {
    constructor(
      @inject(TYPES.ConfigEntity) @named(Entity.User) entity: string) {
      super(entity);      
    }
}

export { UserRepository };