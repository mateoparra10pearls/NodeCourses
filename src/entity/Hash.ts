import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import BaseEntityApp from "../shared/database/BaseEntityApp";

@Index("PK_hash", ["id"], { unique: true })
@Entity("hash", { schema: "dbo" })
export class Hash extends BaseEntityApp{

  @Column("varchar", { name: "hashCode", length: 200 })
  hashCode: string | undefined;

  @Column("varchar", { name: "entityInfo" })
  entityInfo: string | undefined;
}
