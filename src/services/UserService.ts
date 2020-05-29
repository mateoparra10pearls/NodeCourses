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
import { ErrorMessage } from "../shared/Constants";
import { IUserPassword } from "../shared/interfaces/IUserPassword";
import bcrypt from "bcrypt";
import { IUserService } from "./interfaces/IUserService";
import { IHashEntityInfo } from "../shared/interfaces/IHashEntityInfo";
import { Validations } from "../shared/utils/CommonFunctions";
import { IUserLogin } from "../shared/interfaces/IUserLogin";
import jwt from "jsonwebtoken";

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

  login = async (loginDto: IUserLogin) => {
    const user = await this._repository.findObject({ email: loginDto.email }); //, false,  ["Role"]);
    if (user) {
      const isValid = await this.isvalidPassword(loginDto.password, user.password!);
      if (isValid) {
        return this.generateToken(user);
      }

      return Validations.returnSingleError(ErrorMessage.WrongPassword);
    }

    return Validations.returnSingleError(ErrorMessage.NotFoundEmail);
  };

  save = async (user: User) => {
    let userDb = <User>await this._repository.findObject({ email: user.email! });

    if (userDb) return Validations.returnSingleError(ErrorMessage.UserAlreadyExist);

    const result = <User>await this._repository.save(user);
    await this.requestPasswordEmail(result);
    return result;
  };

  savePassword = async (userPassword: IUserPassword) => {
    const hashInfo = <IHashEntityInfo>await this._hashService.getHashInfo(userPassword.hashCode);

    if (hashInfo && hashInfo.entityType === EntityEnum.User) {
      const user = await this._repository.findOne(hashInfo.idEntity);

      if (user) {
        user.password = await this.encryptPassword(userPassword.password);
        await this._repository.save(user);
        await this._hashService.deleteHashByHashCode(userPassword.hashCode);
        return this.generateToken(user);
      }
    }

    return Validations.returnSingleError(ErrorMessage.NotFoundHash);
  };

  /**
   * Private methods (Not included in the Interface or BaseService)
   *
   */

  generateToken = (user: User) => {
    const token = jwt.sign(
      { idUser: user.id, idRole: user.idRole },
      process.env.APP_JWT_TOKEN || "Not Secured"
    );
    return token;
  };

  encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(process.env.SECRET_KEY_APP + password, salt);
  };

  isvalidPassword = async (password: string, encryptedPassword: string) => {
    return await bcrypt.compare(process.env.SECRET_KEY_APP + password, encryptedPassword);
  };

  requestPasswordEmail = async (userSaved: User) => {
    const hash = <Hash>await this._hashService.createHash(userSaved.id!, EntityEnum.User);
    const subject = Templates.userCreatedSubject();
    const body = Templates.userCreatedBody(
      userSaved.firstName + " " + userSaved.lastName,
      hash.hashCode!
    );
    await this._emailSender.sendEmail(userSaved.email!, subject, body);
  };
}

export { UserService };
