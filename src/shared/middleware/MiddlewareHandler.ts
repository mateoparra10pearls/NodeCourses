import { Request, Response, NextFunction } from "express";
import { IResponseApp, IErrorObj } from "../interfaces/IResponseApp";
import jwt from "jsonwebtoken";
import { IPayload } from "../interfaces/IPayload";

export function SetResponseObject(req: Request, res: Response, next: NextFunction) {
  const json_ = res.json;

  res.json = (object: any): Response<any> => {
    if (!object.errorList) {
      object = <IResponseApp>{
        result: object,
      };
    } else {
      const errorObj = <IErrorObj>object.errorList[0];
      if (errorObj && errorObj.code && errorObj.code > 900) res.status(400);
    }

    return json_.call(res, object);
  };

  next();
}

export function SecureRequestToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("Access Denied");

  try {
    const payload = <IPayload>jwt.verify(token, process.env.APP_JWT_TOKEN || "Not Secured");
    req.idUser = payload.idUser;
    req.idRole = payload.idRole;
    console.log("req-role", req.idRole);
    
    next();
  } catch (error) {
    return res.status(401).json("Access Denied (Invalid Token)");
  }  
}
