
import { User } from "../entity/User"
import { injectable, inject, named } from "inversify";
import { IBaseRepository } from "./interfaces/IBaseRepository";
import BaseRepository from "./BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { DIContainer } from "../shared/dependencies/Container";
import { IConnectionApp } from "../shared/interfaces/IConnectionApp";

export interface IUserRepository extends IBaseRepository<User> {

}

@injectable()
class UserRepository extends BaseRepository<User> implements IUserRepository{
    constructor(
      @inject(TYPES.IConnectionApp) connectionApp: IConnectionApp,
      @inject(TYPES.ConfigEntity) @named(Entity.User) entity: string) {
      super(connectionApp, entity);      
    }
}

export { UserRepository };