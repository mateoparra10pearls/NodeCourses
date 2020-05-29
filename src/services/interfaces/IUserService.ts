import { IBaseService } from "../base/IBaseService";
import { User } from "../../entity/User";
import { IUserPassword } from "../../shared/interfaces/IUserPassword";
import { IUserLogin } from "../../shared/interfaces/IUserLogin";

export interface IUserService extends IBaseService<User> { 
  savePassword(userPassword : IUserPassword) : Promise<any>;
  login(loginDto : IUserLogin) : Promise<any>;
}