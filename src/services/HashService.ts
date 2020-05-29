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
class HashService extends BaseService<Hash> implements IHashService {
  constructor(@inject(TYPES.HashRepository) repo: IBaseRepository<Hash>) {
    super(repo);
  }

  public async deleteHashByHashCode(hashCode: string): Promise<void> {
    const hash = <Hash>await this._repository.findObject({ hashCode });
    if (hash) {
      await this._repository.delete(hash.id!);
    }
  }

  public async createHash(idEntity: number, entityType: number): Promise<Hash> {
    const entityInfo: IHashEntityInfo = {
      entityType,
      idEntity,
      idHashTable: 1,
    };

    let hash = new Hash();
    hash.hashCode = Guid.create().toString();
    hash.entityInfo = JSON.stringify(entityInfo);
    return await this._repository.save(hash);
  }

  public async getHashInfo(hashCode: string): Promise<IHashEntityInfo> {
    const hash = <Hash>await this._repository.findObject({hashCode: hashCode});
    if (hash && hash.entityInfo) {
      let entityInfo = <IHashEntityInfo>JSON.parse(hash.entityInfo);
      entityInfo.idHashTable = hash.id!;
      return entityInfo;
    }

    return { entityType: 0, idEntity: 0, idHashTable: 0 };
  }
}

export { HashService };
