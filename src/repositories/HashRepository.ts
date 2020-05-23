import { injectable, inject, named } from "inversify";
import BaseRepository from "./base/BaseRepository";
import { TYPES } from "../shared/dependencies/Types";
import { Entity } from "../shared/Constants";
import { IBaseRepository } from "./base/IBaseRepository";
import { Hash } from "../entity/Hash";

@injectable()
class HashRepository extends BaseRepository<Hash> implements IBaseRepository<Hash>{
    constructor(
      @inject(TYPES.ConfigEntity) @named(Entity.Hash) entity: string) {
      super(entity);      
    }
}

export { HashRepository };