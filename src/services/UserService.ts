import { injectable, inject } from "inversify";
import BaseService from "./base/BaseService";
import { TYPES } from "../shared/dependencies/Types";
import { User } from "../entity/User";
import { IBaseRepository } from "../repositories/base/IBaseRepository";
import { Hash } from "../entity/Hash";
import { IHashService } from "./interfaces/IHashService";
import { EntityEnum } from "../shared/enums/EntityEnum";
import { IEmailSender } from "../shared/interfaces/IEmailSender";
import { Templates } from "../shared/Templates";
import { IResponseApp } from "../shared/interfaces/IResponseApp";
import { ErrorMessage } from "../shared/Constants";
import { IUserPassword } from "../shared/interfaces/IUserPassword";
import CryptoJS from "crypto-js";
import { IUserService } from "./interfaces/IUserService";

@injectable()
class UserService extends BaseService<User> implements IUserService {
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

    let userList = <User[]>(
      await this._repository.findObject({ email: user.email! })
    );
    if (userList && userList.length > 0)
      return <IResponseApp>{
        error: {
          code: ErrorMessage.UserAlreadyExist.code,
          message: ErrorMessage.UserAlreadyExist.message,
        },
      };

    const result = <User>await this._repository.save(user);
    if (isCreating) {
      await this.requestPasswordEmail(result);
    }

    return result;
  };

  savePassword = async (userPassword: IUserPassword) => {
    if (true) {
      const user = await this._repository.findOne(userPassword.id);
      if (user) {
        user.password = this.encryptPassword(userPassword.password);
        return await this._repository.save(user);
      } else {
        return <IResponseApp>{
          error: {
            code: ErrorMessage.BadFormat.code,
            message: ErrorMessage.BadFormat.message,
          },
        };
      }
    } 

    return <IResponseApp>{
      error: {
        code: ErrorMessage.BadFormat.code,
        message: ErrorMessage.BadFormat.message,
      },
    };
  };

  // Private methods (Not included in the Interface or BaseService)

  encryptPassword = (password: string) => {
    return CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY_APP || "Not Secure Key"
    ).toString();
  };

  isvalidPassword = (password: string, encryptedPassword: string) => {
    return this.encryptPassword(password) === encryptedPassword;
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
