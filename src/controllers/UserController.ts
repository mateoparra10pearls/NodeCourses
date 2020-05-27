import express, { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../shared/dependencies/Types";
import { ErrorMessage } from "../shared/Constants";
import { User } from "../entity/User";
import { IBaseController } from "./base/IBaseController";
import { IBaseService } from "../services/base/IBaseService";
import { Hash } from "../entity/Hash";
import { IHashService } from "../services/interfaces/IHashService";
import { IResponseApp } from "../shared/interfaces/IResponseApp";

@injectable()
class UserController implements IBaseController {
  public path = "/users";
  public router = express.Router();
  private _userService: IBaseService<User>;
  private _hashService: IHashService;

  constructor(
    @inject(TYPES.UserService) userService: IBaseService<User>,
    @inject(TYPES.UserService) hashService: IHashService
  ) {
    this.intializeRoutes();
    this._userService = userService;
    this._hashService = hashService;
  }

  intializeRoutes = () => {
    this.router.get(this.path, this.get);
    this.router.get(this.path + "/getHashInfo/:hash", this.get);
    this.router.get(this.path + "/:id", this.getOne);
    this.router.post(this.path, this.save);
  };

  getHashInfo = async (req: Request, res: Response): Promise<any> => {
    const hash = req.params.hash;
    const result = await this._hashService.getHashInfo(hash);
    return res.json(result);
  };

  get = async (req: Request, res: Response): Promise<any> => {
    let result: any;
    result = await this._userService.get();
    return res.json(result);
  };

  getOne = async (req: Request, res: Response): Promise<any> => {
    // Retrieve the tag from our URL path
    const id = Number(req.params.id);
    let result: any;
    if (isNaN(id)) {
      result = <IResponseApp>{
        error: {
          code: ErrorMessage.BadFormat.code,
          message: ErrorMessage.BadFormat.message,
        },
      };
    } else {
      result = await this._userService.getOne(id);
    }

    return res.json(result);
  };

  save = async (req: Request, res: Response): Promise<any> => {
    // Retrieve the tag from our URL path
    let result: any;
    const body = <User>req.body;
    result = <User>await this._userService.save(body);
    return res.json(result);
  };
}

export default UserController;
