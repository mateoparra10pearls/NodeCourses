import {
  Column,
  Entity,
  Index,
  OneToMany
} from "typeorm";
import { Category } from "./Category";
import BaseEntity from "../shared/database/BaseEntityApp";
import BaseEntityApp from "../shared/database/BaseEntityApp";

@Index("PK_categoryType", ["id"], { unique: true })
@Entity("categoryType", { schema: "dbo" })
export class CategoryType extends BaseEntityApp {
  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @OneToMany(() => Category, (category) => category.idCategoryType)
  categories: Category[] | undefined;
}
