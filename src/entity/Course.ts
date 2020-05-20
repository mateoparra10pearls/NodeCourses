import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Section } from "./Section";

@Index("PK_course", ["id"], { unique: true })
@Entity("course", { schema: "dbo" })
export class Course {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number | undefined;

  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @Column("bit", { name: "isDeleted" })
  isDeleted: boolean | undefined;

  @ManyToOne(() => Category, (category) => category.courses)
  @JoinColumn([{ name: "idCategory", referencedColumnName: "id" }])
  idCategory: Category | undefined;

  @OneToMany(() => Section, (section) => section.idCourse)
  sections: Section[] | undefined;
}
