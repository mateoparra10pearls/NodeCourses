import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Section } from "./Section";
import { User } from "./User";
import BaseEntityApp from "../shared/database/BaseEntityApp";

@Index("PK_userSection", ["id"], { unique: true })
@Entity("userSection", { schema: "dbo" })
export class UserSection extends BaseEntityApp{

  @ManyToOne(() => Section, (section) => section.userSections)
  @JoinColumn([{ name: "idSection", referencedColumnName: "id" }])
  idSection: Section | undefined;

  @ManyToOne(() => User, (user) => user.userSections)
  @JoinColumn([{ name: "idUser", referencedColumnName: "id" }])
  idUser: User | undefined;
}
