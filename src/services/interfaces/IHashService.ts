import { IBaseService } from "../base/IBaseService";
import { Hash } from "../../entity/Hash";
import { IHashEntityInfo } from "../../shared/interfaces/IHashEntityInfo";

export interface IHashService extends IBaseService<Hash> { 
  createHash(idEntity: number, entityType: number): Promise<Hash>;
  getHashInfo(hashCode: string): Promise<IHashEntityInfo>;  
}