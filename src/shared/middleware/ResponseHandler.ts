import { Request, Response, NextFunction, Send } from "express";
import { IResponseApp } from "../interfaces/IResponseApp";
import { Any } from "typeorm";

export function SetResponseObject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const json_ = res.json; // capture the default resp.json implementation

  res.json = (object: any): Response<any> => {
    if (!object.error) {
      object = <IResponseApp>{
        result: object,
      };
    } else {
      if (object.error.code && Number(object.error.code) > 900)
        res.status(400);
    }

    return json_.call(res, object);
  };

  next();
}
