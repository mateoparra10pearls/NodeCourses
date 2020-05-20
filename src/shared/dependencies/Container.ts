import { Container } from "inversify";
import { IUserRepository, UserRepository } from "../../repositories/UserRepository";
import { TYPES } from "./Types";
import { IConnectionApp } from "../interfaces/IConnectionApp";
import ConnectionApp from "../connection/ConnectionApp";
import { Entity } from "../Constants";
import { IUserController } from "../../controllers/interfaces/IUserController";
import UserController from "../../controllers/UserController";

let DIContainer =  new Container();

type ConfigEntity = string;

// Controllers
DIContainer.bind<IUserController>(TYPES.IUserController).to(UserController);

// Repositories
DIContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

// Shared
DIContainer.bind<IConnectionApp>(TYPES.IConnectionApp).to(ConnectionApp);

// Entities
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity)
         .toConstantValue(Entity.User)
         .whenTargetNamed(Entity.User);


export { DIContainer }