import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { UserSection } from "./UserSection";

@Entity("user", { schema: "dbo" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number | undefined;

  @Column("nvarchar", { name: "email", length: 255 })
  email: string | undefined;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn([{ name: "idRole", referencedColumnName: "id" }])
  @Column()
  idRole: Role | undefined;

  @OneToMany(() => UserSection, (userSection) => userSection.idUser)
  userSections: UserSection[] | undefined;
}
