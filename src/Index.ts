import "reflect-metadata";
import App from "./App";
import UserController from "./controllers/User.Controller";
import { TYPES } from "./shared/Types";
import { DIContainer } from "./shared/Container";
import { IUserRepository } from "./repositories/UserRepository";

const initialize = () => {
  const app = new App(
    [
      new UserController(
        DIContainer.get<IUserRepository>(TYPES.IUserRepository)
      ),
    ],
    5000
  );

  app.listen();
  console.log("App listening");
};

initialize();
