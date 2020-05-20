import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Section } from "./Section";
import { User } from "./User";

@Index("PK_userSection", ["id"], { unique: true })
@Entity("userSection", { schema: "dbo" })
export class UserSection {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number | undefined;

  @Column("bit", { name: "isDeleted" })
  isDeleted: boolean | undefined;

  @ManyToOne(() => Section, (section) => section.userSections)
  @JoinColumn([{ name: "idSection", referencedColumnName: "id" }])
  idSection: Section | undefined;

  @ManyToOne(() => User, (user) => user.userSections)
  @JoinColumn([{ name: "idUser", referencedColumnName: "id" }])
  idUser: User | undefined;
}
