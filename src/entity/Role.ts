import {
  Column,
  Entity,
  Index,
  OneToMany
} from "typeorm";
import { User } from "./User";
import BaseEntityApp from "../shared/database/BaseEntityApp";

@Index("PK_role", ["id"], { unique: true })
@Entity("role", { schema: "dbo" })
export class Role extends BaseEntityApp{

  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @OneToMany(() => User, (user) => user.idRole)
  users: User[] | undefined;
}
