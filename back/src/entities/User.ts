import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Index,
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
  @Index(["email"])
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string
  
    @Column({ length: 100 })
    name: string
  
    @Column({ unique: true, length: 255 })
    email: string
  
    @Column({ nullable: true, length: 255 })
    password: string
  
    @Column({ type: "enum", enum: AuthProvider, default: AuthProvider.EMAIL })
    auth_provider: AuthProvider
  
    @Column({ type: "enum", enum: Role, default: Role.USER })
    role: Role
  
    @Column({ nullable: true, length: 255 })
    profile_picture: string
  
    @Column({ nullable: true, length: 20 })
    phone: string
  
    @Column({ default: true })
    is_active: boolean
  
    @Column({ nullable: true })
    last_login: Date
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  
    @OneToMany(() => Ebook, (ebook) => ebook.user)
    ebooks: Ebook[]
  }