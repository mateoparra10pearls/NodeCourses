import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Section } from "./Section";

@Index("PK_userSection", ["id"], { unique: true })
@Entity("userSection", { schema: "dbo" })
export class UserSection {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number | undefined;

  @ManyToOne(() => User, (user) => user.userSections)
  @JoinColumn([{ name: "idUser", referencedColumnName: "id" }])
  idUser: User | undefined;

  @ManyToOne(() => Section, (section) => section.userSections)
  @JoinColumn([{ name: "idSection", referencedColumnName: "id" }])
  idSection: Section | undefined;
}
