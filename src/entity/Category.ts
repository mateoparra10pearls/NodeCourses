import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryType } from "./CategoryType";
import { Course } from "./Course";

@Index("PK_category", ["id"], { unique: true })
@Entity("category", { schema: "dbo" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number | undefined;

  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @ManyToOne(() => CategoryType, (categoryType) => categoryType.categories)
  @JoinColumn([{ name: "idCategoryType", referencedColumnName: "id" }])
  idCategoryType: CategoryType | undefined;

  @OneToMany(() => Course, (course) => course.idCategory)
  courses: Course[] | undefined;
}
