import { Request, Response, NextFunction, Send } from "express";
import { IResponseApp } from "../interfaces/IResponseApp";
import { Commonvalidations } from "../utils/CommonFunctions";

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

export function SetRequestValidations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const json = req.body;
  console.log("checking...");
  
  const isValid = Commonvalidations.checkObject(json);

  if (isValid) {
    next();
  } else {
    res.status(404).send({ message: "Not found" });
  }

}
