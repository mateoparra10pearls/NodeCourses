import App from "./App";
import { TYPES } from "./shared/dependencies/Types";
import { DIContainer } from "./shared/dependencies/Container";
import { createConnection } from "typeorm";
import { IBaseController } from "./controllers/base/IBaseController";

const initialize = () => {
  createConnection()
    .then(() => {
      const app = new App(
        [DIContainer.get<IBaseController>(TYPES.UserController),
          DIContainer.get<IBaseController>(TYPES.RoleController)],
        5000
      );

      app.listen();
    })
    .catch((error) => console.log(error));
};

initialize();
