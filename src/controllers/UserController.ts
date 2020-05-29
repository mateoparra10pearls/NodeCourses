import express, { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../shared/dependencies/Types";
import { ErrorMessage, RequestPaths } from "../shared/Constants";
import { User } from "../entity/User";
import { IBaseController } from "./base/IBaseController";
import { IHashService } from "../services/interfaces/IHashService";
import { IUserPassword } from "../shared/interfaces/IUserPassword";
import { IUserService } from "../services/interfaces/IUserService";
import { Validations } from "../shared/utils/CommonFunctions";
import { IUserLogin } from "../shared/interfaces/IUserLogin";
import { SecureRequestToken } from "../shared/middleware/MiddlewareHandler";

@injectable()
class UserController implements IBaseController {
  //public path = "/users";
  public router = express.Router();
  private _userService: IUserService;
  private _hashService: IHashService;

  constructor(
    @inject(TYPES.UserService) userService: IUserService,
    @inject(TYPES.UserService) hashService: IHashService
  ) {
    this.intializeRoutes();
    this._userService = userService;
    this._hashService = hashService;
  }

  intializeRoutes = () => {
    this.router.get(RequestPaths.User_GetAll, SecureRequestToken, this.get);
    this.router.get(RequestPaths.User_GetHashInfo, this.getHashInfo);
    this.router.get(RequestPaths.User_GetOne, SecureRequestToken, this.getOne);
    this.router.post(RequestPaths.User_Save, Validations.validate_User, this.save);
    this.router.post(
      RequestPaths.User_SavePassword,
      Validations.validate_IUserPassword,
      this.savePassword
    );
    this.router.post(RequestPaths.User_Login, Validations.validate_IUserLogin, this.login);
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
    const id = Number(req.params.id);
    let result: any;
    if (isNaN(id)) {
      result = Validations.returnSingleError(ErrorMessage.BadFormat);
    } else {
      result = await this._userService.getOne(id);
    }

    return res.json(result);
  };

  login = async (req: Request, res: Response): Promise<any> => {
    let result: any;
    const body = <IUserLogin>req.body;
    result = await this._userService.login(body);
    return res.json(result);
  };

  save = async (req: Request, res: Response): Promise<any> => {
    let result: any;
    const body = <User>req.body;
    result = await this._userService.save(body);
    return res.json(result);
  };

  savePassword = async (req: Request, res: Response): Promise<any> => {
    let result: any;
    const body = <IUserPassword>req.body;
    result = <User>await this._userService.savePassword(body);    
    return res.json(result);
  };
}

export default UserController;
