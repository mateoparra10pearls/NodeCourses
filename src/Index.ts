import "reflect-metadata";
import App from "./App";
import { TYPES } from "./shared/dependencies/Types";
import { DIContainer } from "./shared/dependencies/Container";
import { IUserController } from "./controllers/interfaces/IUserController";
import { createConnection } from "typeorm";

const initialize = () => {
  createConnection()
    .then(() => {
      const app = new App(
        [DIContainer.get<IUserController>(TYPES.IUserController)],
        5000
      );

      app.listen();
    })
    .catch((error) => console.log(error));
};

initialize();
