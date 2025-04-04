import { Entity, PrimaryGeneratedColumn } from "typeorm";

enum Status {
    ESTRUCTURA= "estructura",
    COMPLETO = "completo",
    BORRADOR = "borrador"
}

@Entity({name: "ebooks"})
export class Ebook {
    @PrimaryGeneratedColumn("uuid")
    id: string
    
}