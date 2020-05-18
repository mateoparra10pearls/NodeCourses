import { IUserRepository } from "../repositories/UserRepository";
import express, { Request, Response } from "express";
import { User } from "../entity/User";
import { inject } from "inversify";
import { TYPES } from "../shared/Types";

class UserController {
  public path = "/users";
  public router = express.Router();
  private _userRepo: IUserRepository; // like here


  constructor(@inject(TYPES.IUserRepository) userRepo: IUserRepository) {
    this.intializeRoutes();
    this._userRepo = userRepo;
  }

  intializeRoutes = () => {
    this.router.get(this.path, this.getUsers);
  }

  getUsers = async (req: Request, res: Response): Promise<any> => {
    console.log(`controller: ${req}`);
    console.log(`repo: ${this._userRepo}`);
    const users = <User[]>await this._userRepo.findAll();
    return res.status(200).json({ users });
  }
}

export default UserController;
