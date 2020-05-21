import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Course } from "./Course";
import { Tag } from "./Tag";
import BaseEntityApp from "../shared/database/BaseEntityApp";

@Index("PK_courseTag", ["id"], { unique: true })
@Entity("courseTag", { schema: "dbo" })
export class CourseTag extends BaseEntityApp{

  @ManyToOne(() => Course, (course) => course.courseTags)
  @JoinColumn([{ name: "idCourse", referencedColumnName: "id" }])
  idCourse: Course | undefined;

  @ManyToOne(() => Tag, (tag) => tag.courseTags)
  @JoinColumn([{ name: "idTag", referencedColumnName: "id" }])
  idTag: Tag | undefined;
}
