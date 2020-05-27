import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { IBaseService } from "./base/IBaseService";
import { Role } from "../entity/Role";
import { IEmailSender } from "../shared/interfaces/IEmailSender";

@injectable()
class RoleService extends BaseService<Role> implements IBaseService<Role> {
  private _emailSender: IEmailSender;
  constructor(@inject(TYPES.RoleRepository) repo: IBaseRepository<Role>,
  @inject(TYPES.EmailSender) emailSender: IEmailSender) {
    super(repo);
    this._emailSender = emailSender;
  }
}

export { RoleService };