import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Section } from "./Section";

@Index("PK_course", ["id"], { unique: true })
@Entity("course", { schema: "dbo" })
export class Course {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number | undefined;

  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @OneToMany(() => Section, (section) => section.idCourse)
  sections: Section[] | undefined;
}
