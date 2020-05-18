import { Connection } from "typeorm";

export interface IConnectionApp {          // Exported
    getConnection() : Promise<Connection>;
}