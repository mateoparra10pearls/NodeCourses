import express, { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../shared/dependencies/Types";
import { ErrorMessage } from "../shared/Constants";
import { IBaseController } from "./base/IBaseController";
import { IBaseService } from "../services/base/IBaseService";
import { Tag } from "../entity/Tag";
import { IResponseApp } from "../shared/interfaces/IResponseApp";
import { Validations } from "../shared/utils/CommonFunctions";

@injectable()
class TagController implements IBaseController {
  public path = "/tags";
  public router = express.Router();
  private _service: IBaseService<Tag>;

  constructor(@inject(TYPES.TagService) service: IBaseService<Tag>) {
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
    if (isNaN(id)) {
      return res.status(400).json(Validations.returnSingleError(ErrorMessage.BadFormat));
    }

    const result = await this._service.getOne(id);
    return res.status(200).json(result);
  }

  save = async (req: Request, res: Response): Promise<any> => {
    // Retrieve the tag from our URL path
    const data = <Tag>req.body;
    
    const result = await this._service.save(data);
    return res.status(200).json(result);
  }
}

export default TagController;
