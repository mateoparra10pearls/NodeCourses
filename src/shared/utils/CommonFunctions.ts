import { IUserPassword } from "../interfaces/IUserPassword";
import { IUserLogin } from "../interfaces/IUserLogin";
import { IResponseApp } from "../interfaces/IResponseApp";
import { parse } from "querystring";
import { User } from "../../entity/User";

export class Commonvalidations {
  /**
   * Checks if the given json object is type of a given instance (class/interface) type.
   * @param jsonObject Object to check.
   * */
    public static checkObject(jsonObject: any) {
      let obj: any = {};
      obj = (jsonObject as IUserPassword);
      if (obj.confirmPassword) {
        console.log("it is IUserPassword Interface");
        return false;
      }

      obj = (jsonObject as User);
      if (obj.email && obj.idRole) {
        console.log("it is User!");
      }

      
    }

  }