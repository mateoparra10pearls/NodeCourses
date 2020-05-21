import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Course } from "./Course";
import { UserSection } from "./UserSection";
import BaseEntityApp from "../shared/database/BaseEntityApp";

@Index("PK_section", ["id"], { unique: true })
@Entity("section", { schema: "dbo" })
export class Section extends BaseEntityApp{

  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @Column("time", { name: "time" })
  time: Date | undefined;

  @ManyToOne(() => Course, (course) => course.sections)
  @JoinColumn([{ name: "idCourse", referencedColumnName: "id" }])
  idCourse: Course | undefined;

  @OneToMany(() => UserSection, (userSection) => userSection.idSection)
  userSections: UserSection[] | undefined;
}
