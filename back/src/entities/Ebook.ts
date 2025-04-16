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
  import { User } from "./User"
  import { Prompt } from "./Prompt"
  import { Chapter } from "./Chapter"
  
  export enum EbookStatus {
    STRUCTURE = "estructura",
    COMPLETE = "completo",
    DRAFT = "borrador",
  }
  
  @Entity("ebooks")
  @Index(["title"])
  @Index(["user"])
  export class Ebook {
    @PrimaryGeneratedColumn("uuid")
    id: string
  
    @ManyToOne(() => User, (user) => user.ebooks, { onDelete: "CASCADE" })
    user: User
  
    @Column({ length: 255 })
    title: string
  
    @Column("text")
    description: string
  
    @Column({ type: "enum", enum: EbookStatus })
    status: EbookStatus
  
    @Column({ default: false })
    is_duplicate: boolean
  
    @Column({ nullable: true, length: 255 })
    cover_image: string
  
    @Column({ default: false })
    exported: boolean
  
    @Column({ default: 0 })
    word_count: number
  
    @Column({ length: 10, default: "es" })
    language: string
  
    @Column("simple-array", { nullable: true })
    tags: string[]
  
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    price: number
  
    @Column({ default: 1 })
    version: number
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  
    @OneToMany(() => Prompt, (prompt) => prompt.ebook)
    prompts: Prompt[]
  
    @OneToMany(() => Chapter, (chapter) => chapter.ebook)
    chapters: Chapter[]
  }
  