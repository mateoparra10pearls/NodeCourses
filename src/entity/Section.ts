import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { UserSection } from "./UserSection";

@Index("PK_section", ["id"], { unique: true })
@Entity("section", { schema: "dbo" })
export class Section {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number | undefined;

  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @Column("time", { name: "time" })
  time: Date | undefined;

  @Column("bit", { name: "isDeleted" })
  isDeleted: boolean | undefined;

  @ManyToOne(() => Course, (course) => course.sections)
  @JoinColumn([{ name: "idCourse", referencedColumnName: "id" }])
  idCourse: Course | undefined;

  @OneToMany(() => UserSection, (userSection) => userSection.idSection)
  userSections: UserSection[] | undefined;
}
