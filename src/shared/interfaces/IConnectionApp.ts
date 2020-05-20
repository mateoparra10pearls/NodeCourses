import { Repository } from "typeorm";

export interface IConnectionApp {          // Exported
    getEntityRepository(repoName : string): Promise<Repository<any>>
}