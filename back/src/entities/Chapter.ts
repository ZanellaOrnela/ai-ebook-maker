import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from "typeorm"
  import { Ebook } from "./Ebook"
  import { Section } from "./Section"
  
  export enum ChapterStatus {
    DRAFT = "draft",
    REVIEW = "review",
    PUBLISHED = "published",
  }
  
  @Entity("chapters")
  @Index(["title"])
  @Index(["ebook"])
  export class Chapter {
    @PrimaryGeneratedColumn("uuid")
    id: string
  
    @ManyToOne(() => Ebook, (ebook) => ebook.chapters, { onDelete: "CASCADE" })
    ebook: Ebook
  
    @Column({ length: 255 })
    title: string
  
    @Column()
    position: number
  
    @Column("text")
    content: string
  
    @Column({ default: false })
    generated: boolean
  
    @Column({ default: 0 })
    word_count: number
  
    @Column({ type: "enum", enum: ChapterStatus, default: ChapterStatus.DRAFT })
    status: ChapterStatus
  
    @Column({ default: 0 })
    estimated_read_time: number
  
    @Column("jsonb", { nullable: true })
    metadata: Record<string, any>
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  
    @OneToMany(() => Section, (section) => section.chapter)
    sections: Section[]
  }