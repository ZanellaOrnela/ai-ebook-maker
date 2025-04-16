import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from "typeorm"
  import { Ebook } from "./Ebook"
  
  export enum ToneStyle {
    FORMAL = "formal",
    INFORMAL = "informal",
    MOTIVATIONAL = "motivacional",
    TECHNICAL = "tecnico",
  }
  
  @Entity("prompts")
  @Index(["topic"])
  @Index(["ebook"])
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
  
    @Column({ type: "decimal", precision: 3, scale: 2, default: 0.7 })
    temperature: number
  
    @Column({ default: 2000 })
    max_tokens: number
  
    @Column({ length: 10, default: "es" })
    language: string
  
    @Column({ default: 1 })
    version: number
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  }