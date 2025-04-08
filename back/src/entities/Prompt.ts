import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from "typeorm"
  import { Ebook } from "./Ebook"
  
  export enum ToneStyle {
    FORMAL = "formal",
    INFORMAL = "informal",
    MOTIVATIONAL = "motivacional",
    TECHNICAL = "tecnico",
  }
  
  @Entity("prompts")
  export class Prompt {
    @PrimaryGeneratedColumn("uuid")
    id: string
  
    @ManyToOne(() => Ebook, (ebook) => ebook.prompts, { onDelete: "CASCADE" })
    ebook: Ebook
  
    @Column({ length: 255 })
    topic: string
  
    @Column({ length: 255 })
    audience: string
  
    @Column({ length: 100 })
    tone: string
  
    @Column({ length: 50 })
    length_preference: string
  
    @Column({ length: 100 })
    style: string
  
    @Column("text")
    keywords: string
  
    @Column("text")
    extras: string
  
    @Column()
    include_intro: boolean
  
    @Column()
    include_outro: boolean
  
    @CreateDateColumn()
    created_at: Date
  }