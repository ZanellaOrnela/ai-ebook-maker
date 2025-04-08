import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
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
  
    @Column({ nullable: true })
    cover_image: string
  
    @Column({ default: false })
    exported: boolean
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  
    @OneToMany(() => Prompt, (prompt) => prompt.ebook)
    prompts: Prompt[]
  
    @OneToMany(() => Chapter, (chapter) => chapter.ebook)
    chapters: Chapter[]
  }
  