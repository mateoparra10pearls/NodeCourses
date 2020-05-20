import { IUserRepository } from "../repositories/UserRepository";
import express, { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../shared/dependencies/Types";
import { IUserController } from "./interfaces/IUserController";

@injectable()
class UserController implements IUserController {
  public path = "/users";
  public router = express.Router();
  private _userRepository: IUserRepository;

  constructor(@inject(TYPES.IUserRepository) userRepo: IUserRepository) {
    this.intializeRoutes();
    this._userRepository = userRepo;
  }

  intializeRoutes = () => {
    this.router.get(this.path, this.get);
  }

  get = async (req: Request, res: Response): Promise<any> => {
    const user = await this._userRepository.findOne(1);
    return res.status(200).json({ user });
  }
}

export default UserController;
