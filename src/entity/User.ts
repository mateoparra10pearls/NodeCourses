import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Role } from "./Role";
import { UserSection } from "./UserSection";
import BaseEntityApp from "../shared/database/BaseEntityApp";

@Entity("user", { schema: "dbo" })
export class User extends BaseEntityApp{
  @Column("nvarchar", { name: "email", length: 255 })
  email: string | undefined;

  @Column("varchar", { name: "firstName", length: 200 })
  firstName: string | undefined;

  @Column("varchar", { name: "lastName", length: 200 })
  lastName: string | undefined;

  @Column("varchar", { name: "password", nullable: true, length: 500 })
  password: string | null | undefined;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn([{ name: "idRole", referencedColumnName: "id" }])
  idRole: Role | undefined;

  @OneToMany(() => UserSection, (userSection) => userSection.idUser)
  userSections: UserSection[] | undefined;
}
