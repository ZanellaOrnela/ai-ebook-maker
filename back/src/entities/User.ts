
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from "typeorm"
  import { Ebook } from "./Ebook"
  
  export enum Role {
    ADMIN = "admin",
    USER = "user",
  }
  
  export enum AuthProvider {
    GOOGLE = "google",
    EMAIL = "email",
  }
  
  @Entity("users")
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string
  
    @Column({ length: 100 })
    name: string
  
    @Column({ unique: true })
    email: string
  
    @Column({ nullable: true })
    password: string
  
    @Column({ type: "enum", enum: AuthProvider, default: AuthProvider.EMAIL })
    auth_provider: AuthProvider
  
    @Column({ type: "enum", enum: Role, default: Role.USER })
    role: Role
  
    @Column({ nullable: true })
    profile_picture: string
  
    @CreateDateColumn()
    created_at: Date
  
    @OneToMany(() => Ebook, (ebook) => ebook.user)
    ebooks: Ebook[]
  }