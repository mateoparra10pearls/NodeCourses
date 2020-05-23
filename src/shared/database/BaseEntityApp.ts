import { PrimaryGeneratedColumn, Column } from "typeorm";

class BaseEntityApp {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number | undefined;

  @Column("bit", { name: "isDeleted", select: false })
  isDeleted: boolean | undefined;
}

export default BaseEntityApp;