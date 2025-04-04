import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Role {
    ADMIN = "admin",
    USER = "user"
}

enum Auth {
    GOOGLE = "google",
    EMAIL = "email"
}

@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: "enum", enum: Auth })
    auth_provider: Auth;

    @Column({ type: "enum", enum: Role, default: Role.USER })
    role: Role;

    @CreateDateColumn()
    created_at: Date;
}
