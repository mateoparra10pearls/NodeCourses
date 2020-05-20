import { Request, Response } from "express";
export interface IBaseController {
  intializeRoutes() :void;
  get(req: Request, res: Response): Promise<any>;
}