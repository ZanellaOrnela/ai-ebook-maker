import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from "typeorm"
  import { Chapter } from "./Chapter"
  
  @Entity("sections")
  export class Section {
    @PrimaryGeneratedColumn("uuid")
    id: string
  
    @ManyToOne(() => Chapter, (chapter) => chapter.sections, { onDelete: "CASCADE" })
    chapter: Chapter
  
    @Column("text")
    content: string
  
    @Column()
    position: number
  
    @Column({ nullable: true })
    image_url: string
  }
  