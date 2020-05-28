import { Request, Response, NextFunction, Send } from "express";
import { IResponseApp, IErrorObj } from "../interfaces/IResponseApp";

export function SetResponseObject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const json_ = res.json; 

  res.json = (object: any): Response<any> => {
    if (!object.errorList) {
      object = <IResponseApp>{
        result: object,
      };
    } else {
      const errorObj = <IErrorObj>object.errorList[0];
      if (errorObj && errorObj.code && Number(errorObj.code) > 900) res.status(400);
    }

    return json_.call(res, object);
  };

  next();
}

// export function SetRequestValidations(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const json = req.body;
//   const isValid = CommonValidations.checkObject(req);

//   if (!isValid.error){
//     next();
//   } else {
//     res.status(400).json(isValid);
//   }
// }
