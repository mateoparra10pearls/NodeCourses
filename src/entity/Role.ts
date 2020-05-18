import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("PK_role", ["id"], { unique: true })
@Entity("role", { schema: "dbo" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number | undefined;

  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @OneToMany(() => User, (user) => user.idRole)
  users: User[] | undefined;
}
