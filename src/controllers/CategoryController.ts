import express, { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../shared/dependencies/Types";
import { ErrorMessage, RequestPaths, Roles } from "../shared/Constants";
import { IBaseController } from "./base/IBaseController";
import { IBaseService } from "../services/base/IBaseService";
import { Category } from "../entity/Category";
import { IResponseApp } from "../shared/interfaces/IResponseApp";
import { Validations } from "../shared/utils/CommonFunctions";
import { SecureRequestToken } from "../shared/middleware/MiddlewareHandler";
import { Role } from "../entity/Role";

@injectable()
class CategoryController implements IBaseController {
  public router = express.Router();
  private _service: IBaseService<Category>;
  private _roleService: IBaseService<Role>;

  constructor(
    @inject(TYPES.CategoryService) service: IBaseService<Category>,
    @inject(TYPES.RoleService) roleService: IBaseService<Role>
  ) {
    this.intializeRoutes();
    this._service = service;
    this._roleService = roleService;
  }

  intializeRoutes = () => {
    this.router.get(RequestPaths.Category_GetAll, SecureRequestToken, this.get);
    this.router.get(RequestPaths.Category_GetOne, SecureRequestToken, this.getOne);
    this.router.post(
      RequestPaths.Category_Save,
      SecureRequestToken,
      Validations.validate_Category,
      this.save
    );
  };

  get = async (req: Request, res: Response): Promise<any> => {
    console.log("cont-req-role", req.idRole);
    const canAccess = await this.canAccess(req.idRole, Roles.Admin, req);
    if (!canAccess) return res.status(403).json("Unauthorized!");

    const result = await this._service.get();
    return res.status(200).json(result);
  };

  getOne = async (req: Request, res: Response): Promise<any> => {
    const canAccess = await this.canAccess(req.idRole, Roles.Admin, req);
    if (!canAccess) return res.status(403).json("Unauthorized!");

    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(Validations.returnSingleError(ErrorMessage.BadFormat));
    }

    const result = await this._service.getOne(id);
    return res.status(200).json(result);
  };

  save = async (req: Request, res: Response): Promise<any> => {
    const canAccess = await this.canAccess(req.idRole, Roles.Admin, req);
    if (!canAccess) return res.status(403).json("Unauthorized!");
    // Retrieve the tag from our URL path
    const data = <Category>req.body;
    const result = await this._service.save(data);
    return res.status(200).json(result);
  };

  canAccess = async (idUserRole: number, roleToVerify: string, req: Request) => {
    const role = <Role>await this._roleService.getOne(idUserRole);
    return role.name === roleToVerify;
  };
}

export default CategoryController;
