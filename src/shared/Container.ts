import { Container } from "inversify";
import { IUserRepository, UserRepository } from "../repositories/UserRepository";
import { TYPES } from "./Types";
import { IBaseRepository } from "../repositories/interfaces/IBaseRepository";
import { IConnectionApp } from "../repositories/interfaces/IConnection";
import ConnectionApp from "./ConnectionApp";
import { Entity } from "./Constants";

let DIContainer =  new Container();

type ConfigEntity = string;

// Repositories
DIContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

// Shared
DIContainer.bind<IConnectionApp>(TYPES.IConnectionApp).to(ConnectionApp);

// Entities
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity)
         .toConstantValue(Entity.User)
         .whenTargetNamed(Entity.User);


export { DIContainer }