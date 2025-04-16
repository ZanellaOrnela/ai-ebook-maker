import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from "typeorm"
  import { Chapter } from "./Chapter"
  
  export enum SectionType {
    TEXT = "text",
    IMAGE = "image",
    CODE = "code",
    TABLE = "table",
  }
  
  @Entity("sections")
  @Index(["chapter"])
  export class Section {
    @PrimaryGeneratedColumn("uuid")
    id: string
  
    @ManyToOne(() => Chapter, (chapter) => chapter.sections, { onDelete: "CASCADE" })
    chapter: Chapter
  
    @Column({ length: 255, nullable: true })
    title: string
  
    @Column("text")
    content: string
  
    @Column()
    position: number
  
    @Column({ nullable: true, length: 255 })
    image_url: string
  
    @Column({ type: "enum", enum: SectionType, default: SectionType.TEXT })
    type: SectionType
  
    @Column({ default: 0 })
    word_count: number
  
    @Column("jsonb", { nullable: true })
    metadata: Record<string, unknown>
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  }
  