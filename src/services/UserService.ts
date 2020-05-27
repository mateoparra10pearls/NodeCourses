import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { User } from "../entity/User";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { Hash } from "../entity/Hash";
import { IHashService } from "./interfaces/IHashService";
import { EntityEnum } from "../shared/enums/EntityEnum";
import { IBaseService } from "./base/IBaseService";
import { IEmailSender } from "../shared/interfaces/IEmailSender";
import { Templates } from "../shared/Templates";
import { IResponseApp } from "../shared/interfaces/IResponseApp";
import { ErrorMessage } from "../shared/Constants";

@injectable()
class UserService extends BaseService<User> implements IBaseService<User> {
  private _hashService: IHashService;
  private _emailSender: IEmailSender;
  constructor(
    @inject(TYPES.UserRepository) repo: IBaseRepository<User>,
    @inject(TYPES.HashService) hashService: IHashService,
    @inject(TYPES.EmailSender) emailSender: IEmailSender
  ) {
    super(repo);
    this._hashService = hashService;
    this._emailSender = emailSender;
  }

  save = async (user: User) => {
    let isCreating = true;
    if (user.id && user.id > 0) {
      isCreating = false;
      // Encrypt password
    }

    let userList = <User[]>await this._repository.findObject({ email: user.email!});
    if (userList && userList.length > 0)
      return <IResponseApp> { error: {
        code: ErrorMessage.UserAlreadyExist.code,
        message: ErrorMessage.UserAlreadyExist.message
      }};

    const result = <User>await this._repository.save(user);
    if (isCreating) {
      await this.requestPasswordEmail(result);
    }

    return result;
  };

  requestPasswordEmail = async (userSaved: User) => {
    const hash = <Hash>(
      await this._hashService.createHash(userSaved.id!, EntityEnum.User)
    );
    const subject = Templates.userCreatedSubject();
    const body = Templates.userCreatedBody(
      userSaved.firstName + " " + userSaved.lastName,
      hash.hashCode!
    );
    await this._emailSender.sendEmail(userSaved.email!, subject, body);
  };
}

export { UserService };
