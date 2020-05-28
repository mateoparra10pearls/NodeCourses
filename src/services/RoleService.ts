import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";
import { Role } from "../entity/Role";

@injectable()
class RoleService extends BaseService<Role> implements IBaseService<Role> {
  constructor(@inject(TYPES.RoleRepository) repo: IBaseRepository<Role>) {
    super(repo);
  }
}

export { RoleService };
