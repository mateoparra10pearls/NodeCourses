import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";

@Index("PK_categoryType", ["id"], { unique: true })
@Entity("categoryType", { schema: "dbo" })
export class CategoryType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number | undefined;

  @Column("varchar", { name: "name", length: 500 })
  name: string | undefined;

  @OneToMany(() => Category, (category) => category.idCategoryType)
  categories: Category[] | undefined;
}
