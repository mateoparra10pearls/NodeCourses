import { IBaseService } from "../base/IBaseService";
import { User } from "../../entity/User";
import { IUserPassword } from "../../shared/interfaces/IUserPassword";

export interface IUserService extends IBaseService<User> { 
  savePassword(userPassword : IUserPassword) : Promise<any>;
}