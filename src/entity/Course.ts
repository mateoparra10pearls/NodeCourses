import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Category } from "./Category";
import { CourseTag } from "./CourseTag";
import { Section } from "./Section";
import BaseEntityApp from "../shared/database/BaseEntityApp";

@Index("PK_course", ["id"], { unique: true })
@Entity("course", { schema: "dbo" })
export class Course extends BaseEntityApp{
  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @Column("varchar", { name: "link", nullable: true, length: 1000 })
  link: string | null | undefined;

  @ManyToOne(() => Category, (category) => category.courses)
  @JoinColumn([{ name: "idCategory", referencedColumnName: "id" }])
  idCategory: Category | undefined;

  @OneToMany(() => CourseTag, (courseTag) => courseTag.idCourse)
  courseTags: CourseTag[] | undefined;

  @OneToMany(() => Section, (section) => section.idCourse)
  sections: Section[] | undefined;
}
