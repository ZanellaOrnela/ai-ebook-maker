import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
  } from "typeorm"
  import { Ebook } from "./Ebook"
  import { Section } from "./Section"
  
  @Entity("chapters")
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
  
    @Column()
    generated: boolean
  
    @CreateDateColumn()
    created_at: Date
  
    @OneToMany(() => Section, (section) => section.chapter)
    sections: Section[]
  }