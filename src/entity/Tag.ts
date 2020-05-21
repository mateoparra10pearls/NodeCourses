import {Column,Entity,Index,OneToMany} from "typeorm";
import {CourseTag} from './CourseTag'
import BaseEntityApp from "../shared/database/BaseEntityApp";


@Index("PK_tag",["id",],{ unique:true })
@Entity("tag" ,{schema:"dbo" } )
export  class Tag extends BaseEntityApp{

@Column("varchar",{ name:"name",length:500 })
name:string | undefined;

@OneToMany(()=>CourseTag,courseTag=>courseTag.idTag)

courseTags:CourseTag[] | undefined;

}
