import express, { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../shared/dependencies/Types";
import { ErrorMessages } from "../shared/Constants";
import { IBaseController } from "./base/IBaseController";
import { IBaseService } from "../services/base/IBaseService";
import { CourseTag } from "../entity/CourseTag";

@injectable()
class CourseTagController implements IBaseController {
  public path = "/courseTags";
  public router = express.Router();
  private _service: IBaseService<CourseTag>;

  constructor(@inject(TYPES.RoleService) service: IBaseService<CourseTag>) {
    this.intializeRoutes();
    this._service = service;
  }

  intializeRoutes = () => {
    this.router.get(this.path, this.get); 
    this.router.get(this.path + "/:id", this.getOne); 
    this.router.post(this.path, this.save)
  }

  get = async (req: Request, res: Response): Promise<any> => {
    const result = await this._service.get();
    return res.status(200).json(result);
  }

  getOne = async (req: Request, res: Response): Promise<any> => {
    // Retrieve the tag from our URL path
    const id = Number(req.params.id);
    if (isNaN(id)){
      return res.status(400).json(ErrorMessages.BadFormat);
    }

    const result = await this._service.getOne(id);
    return res.status(200).json(result);
  }

  save = async (req: Request, res: Response): Promise<any> => {
    // Retrieve the tag from our URL path
    const data = <CourseTag>req.body;
    
    const result = await this._service.save(data);
    return res.status(200).json(result);
  }
}

export default CourseTagController;
