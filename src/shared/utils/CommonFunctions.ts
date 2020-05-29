import { IUserPassword } from "../interfaces/IUserPassword";
import { IResponseApp, IErrorObj } from "../interfaces/IResponseApp";
import { User } from "../../entity/User";
import { Request, Response, NextFunction } from "express";
import { ErrorMessage } from "../Constants";
import { IUserLogin } from "../interfaces/IUserLogin";
import { Category } from "../../entity/Category";
import { Course } from "../../entity/Course";
import { CourseTag } from "../../entity/CourseTag";
import { Section } from "../../entity/Section";

export class Validations {
  public static returnSingleError(errorConst: any) {
    return <IResponseApp>{
      errorList: [
        {
          code: errorConst.code,
          message: errorConst.message,
        },
      ],
    };
  }

  /**
   * This method checks for IUserPassword interface
   */
  public static validate_IUserPassword(request: Request, res: Response, next: NextFunction) {
    let errorList = [];
    let obj = request.body as IUserPassword;
    if (obj && obj.password && obj.confirmPassword && obj.hashCode) {
      if (
        !Validations.isValidLenght(obj.password, 6, 30) ||
        !Validations.isValidLenght(obj.confirmPassword, 6, 30) ||
        obj.password !== obj.confirmPassword
      ) {
        errorList.push(ErrorMessage.BadPasswordFormat);
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
   * This method checks for IUserLogin interface
   */
  public static validate_IUserLogin(request: Request, res: Response, next: NextFunction) {
    let errorList = [];
    let obj = request.body as IUserLogin;
    if (obj && obj.password && obj.email) {
      if (!Validations.isValidEmail(obj.email)) errorList.push(ErrorMessage.BadEmailFormat);

      if (!Validations.isValidLenght(obj.password, 6, 30))
        errorList.push(ErrorMessage.BadPasswordFormat);
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
   * This method checks for Category
   */
  public static validate_Category(request: Request, res: Response, next: NextFunction) {
    let errorList = [];
    let obj = request.body as Category;
    if (!(obj && obj.name && obj.idCategoryType && Validations.isValidLenght(obj.name, 1)))
      errorList.push(ErrorMessage.BadFormat);

    if (errorList.length > 0) {
      Validations.returnError(res, errorList);
    } else {
      next();
    }
  }

  /**
   * This method checks for Course
   */
  public static validate_Course(request: Request, res: Response, next: NextFunction) {
    let errorList = [];
    let obj = request.body as Course;
    if (
      obj &&
      obj.name &&
      obj.link &&
      obj.courseTags &&
      obj.idCategory &&
      obj.sections &&
      Validations.checkTags(obj.courseTags) &&
      Validations.checkSection(obj.sections)
    ) {
      next();
    } else {
      errorList.push(ErrorMessage.BadFormat);
    }

    Validations.returnError(res, errorList);
  }

  /**
   * This method checks for User entity
   */
  public static validate_User(request: Request, res: Response, next: NextFunction) {
    let obj = request.body as User;
    let errorList = [];

    if (obj) {
      if (!Validations.isValidEmail(obj.email)) errorList.push(ErrorMessage.BadEmailFormat);

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

  private static checkTags(tags: CourseTag[]) {
    for (const courseTag of tags) {
      if (!courseTag.idCourse) return false;
    }

    return true;
  }

  private static checkSection(sections: Section[]) {
    for (const section of sections) {
      if (!Validations.isValidLenght(section.name, 1) || !section.time) return false;
    }

    return true;
  }

  private static returnError(res: Response, errorList: any[]) {
    let errorObjList: IErrorObj[] = [];
    errorList.forEach((e) => {
      errorObjList.push({ code: e.code, message: e.message });
    });
    console.log(errorObjList);

    res.status(400).json(<IResponseApp>{
      errorList: errorObjList,
    });
  }

  private static isValidEmail(email?: string) {
    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;

    return false;
  }

  private static isValidLenght(param?: string, min?: number, max?: number) {
    if (!param) return false;
    
    if (min && param.length < min) return false;
    if (max && param.length > max) return false;

    return true;
  }
}
