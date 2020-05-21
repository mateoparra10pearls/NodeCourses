import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { CategoryType } from "./CategoryType";
import { Course } from "./Course";
import BaseEntityApp from "../shared/database/BaseEntityApp";

@Index("PK_category", ["id"], { unique: true })
@Entity("category", { schema: "dbo" })
export class Category extends BaseEntityApp {
  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @ManyToOne(() => CategoryType, (categoryType) => categoryType.categories)
  @JoinColumn([{ name: "idCategoryType", referencedColumnName: "id" }])
  idCategoryType: CategoryType | undefined;

  @OneToMany(() => Course, (course) => course.idCategory)
  courses: Course[] | undefined;
}
