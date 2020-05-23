import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";
import { Hash } from "../entity/Hash";
import { Guid } from "guid-typescript";
import { IHashEntityInfo } from "../shared/interfaces/IHashEntityInfo";
import { IHashService } from "./interfaces/IHashService";

@injectable()
class HashService extends BaseService<Hash> implements IHashService{
    constructor(@inject(TYPES.HashRepository) repo: IBaseRepository<Hash>) {
      super(repo);      
    }

    public async createHash(idEntity: number, entityType: number): Promise<Hash> {
      const entityInfo: IHashEntityInfo = {
        entityType,
        idEntity,
        idHashTable: 1
      }; 
      // entityInfo.idHashTable = 0;
      // entityInfo.idEntity = idEntity;
      // entityInfo.entityType = entityType;

      let hash = new Hash();
      hash.hashCode = Guid.create().toString();
      hash.entityInfo = JSON.stringify(entityInfo);
      return await this._repository.save(hash);
    }

    public async getHashInfo(hashCode: string): Promise<IHashEntityInfo> {
      const hashList = <Hash[]>await this._repository.findObject({ hashCode });
      if (hashList && hashList.length > 0 && hashList[0]) {
        let entityInfo = <IHashEntityInfo>JSON.parse(hashList[0].entityInfo);
        const id = Number(hashList[0].id);
        entityInfo.idHashTable = isNaN(id) ? 0 : id;
        return entityInfo;
      }
      
      const info: IHashEntityInfo = { entityType : 0, idEntity : 0, idHashTable: 0 }; 
      return info;
    }
}

export { HashService };