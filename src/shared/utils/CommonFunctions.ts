import { IUserPassword } from "../interfaces/IUserPassword";
import { IResponseApp, IErrorObj } from "../interfaces/IResponseApp";
import { User } from "../../entity/User";
import { Request, Response, NextFunction } from "express";
import { ErrorMessage } from "../Constants";

export class Validations {
  /**
   * Checks if the given json object is valid for the current rqeuest url.
   * @param jsonObject Object to check.
   * */
  // public static checkObject(request: Request) : IResponseApp {
  //   const url = request.url;
  //   let response : IResponseApp;
  //   switch (true) {
  //     case Validations.isInRequest(url, RequestPaths.User_SavePassword): {
  //       response = this.validate_IUserPassword(request);
  //       break;
  //     }
  //     case this.isInRequest(url, RequestPaths.User_Save): {
  //       response = this.validate_User(request);
  //       break;
  //     }
  //     default: {
  //       response = this.returnSuccess();
  //       break;
  //     }
  //   }

  //   return response;
  // }

  private static isInRequest = (
    requestPath: string,
    methodController: string
  ): boolean => {
    console.log("req", requestPath);
    console.log("meth", methodController);
    return requestPath.includes(methodController);
  };

  /**
   * This method checks for IUserPassword interface
   */
  public static validate_IUserPassword(
    request: Request,
    res: Response,
    next: NextFunction
  ) {
    let errorList = [];
    let obj = request.body as IUserPassword;
    if (obj.id && obj.password && obj.confirmPassword) {
      if (
        !Validations.isValidLenght(obj.password, 6, 30) ||
        !Validations.isValidLenght(obj.confirmPassword, 6, 30) ||
        obj.password !== obj.confirmPassword
      ) {
        errorList.push(ErrorMessage.InvalidPassword);
      } 
    } else {
      errorList.push(ErrorMessage.BadFormat);
    }

    if (errorList.length > 0) {
      Validations.returnError(res, errorList);
    } else {
      next();
    }
  }

  /**
   * This method checks for User entity
   */
  public static validate_User(
    request: Request,
    res: Response,
    next: NextFunction
  ) {
    let obj = request.body as User;
    let errorList = [];

    if (obj) {
      if (!Validations.isValidEmail(obj.email))
        errorList.push(ErrorMessage.BadEmailFormat);

      if (!Validations.isValidLenght(obj.firstName, 1)) {
        let errorObj = ErrorMessage.BadLengthFormat;
        errorObj.message = errorObj.getMessage("-firstName-", 1);
        errorList.push(errorObj);
      }

      if (!Validations.isValidLenght(obj.lastName, 1)) {
        let errorObj = ErrorMessage.BadLengthFormat;
        errorObj.message = errorObj.getMessage("-lastName-", 1);
        errorList.push(errorObj);
      }
    } else {
      errorList.push(ErrorMessage.BadFormat);
    }

    if (errorList.length > 0) {
      Validations.returnError(res, errorList);
    } else {
      next();
    }
  }

  private static returnError(res: Response, errorList: any[]) {
    let errorObjList: IErrorObj[] = [];
    errorList.forEach(e => {
      errorObjList.push({ code : e.code, message : e.message })
    });
    console.log(errorObjList);
    
    res.status(400).json(<IResponseApp>{
      errorList: errorObjList,
    });
  }

  private static isValidEmail(email?: string) {
    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return true;

    return false;
  }

  private static isValidLenght(param?: string, min?: number, max?: number) {
    if (!param) return false;
    if (min && param.length < min) return false;
    if (max && param.length > max) return false;

    return true;
  }
}
