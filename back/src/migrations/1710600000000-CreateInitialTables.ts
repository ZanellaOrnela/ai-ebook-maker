import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1710600000000 implements MigrationInterface {
    name = 'CreateInitialTables1710600000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear enum para roles
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`);
        // Crear enum para auth_provider
        await queryRunner.query(`CREATE TYPE "public"."users_auth_provider_enum" AS ENUM('google', 'email')`);
        // Crear enum para ebook_status
        await queryRunner.query(`CREATE TYPE "public"."ebooks_status_enum" AS ENUM('estructura', 'completo', 'borrador')`);
        // Crear enum para chapter_status
        await queryRunner.query(`CREATE TYPE "public"."chapters_status_enum" AS ENUM('draft', 'review', 'published')`);
        // Crear enum para section_type
        await queryRunner.query(`CREATE TYPE "public"."sections_type_enum" AS ENUM('text', 'image', 'code', 'table')`);

        // Crear tabla users
        await queryRunner.query(`CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying(100) NOT NULL,
            "email" character varying(255) NOT NULL,
            "password" character varying(255),
            "auth_provider" "public"."users_auth_provider_enum" NOT NULL DEFAULT 'email',
            "role" "public"."users_role_enum" NOT NULL DEFAULT 'user',
            "profile_picture" character varying(255),
            "phone" character varying(20),
            "is_active" boolean NOT NULL DEFAULT true,
            "last_login" TIMESTAMP,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "UQ_users_email" UNIQUE ("email"),
            CONSTRAINT "PK_users" PRIMARY KEY ("id")
        )`);

        // Crear tabla ebooks
        await queryRunner.query(`CREATE TABLE "ebooks" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "title" character varying(255) NOT NULL,
            "description" text NOT NULL,
            "status" "public"."ebooks_status_enum" NOT NULL,
            "is_duplicate" boolean NOT NULL DEFAULT false,
            "cover_image" character varying(255),
            "exported" boolean NOT NULL DEFAULT false,
            "word_count" integer NOT NULL DEFAULT 0,
            "language" character varying(10) NOT NULL DEFAULT 'es',
            "tags" text,
            "price" decimal(10,2),
            "version" integer NOT NULL DEFAULT 1,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "user_id" uuid,
            CONSTRAINT "PK_ebooks" PRIMARY KEY ("id"),
            CONSTRAINT "FK_ebooks_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
        )`);

        // Crear tabla prompts
        await queryRunner.query(`CREATE TABLE "prompts" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "topic" character varying(255) NOT NULL,
            "audience" character varying(255) NOT NULL,
            "tone" character varying(100) NOT NULL,
            "length_preference" character varying(50) NOT NULL,
            "style" character varying(100) NOT NULL,
            "keywords" text NOT NULL,
            "extras" text NOT NULL,
            "include_intro" boolean NOT NULL,
            "include_outro" boolean NOT NULL,
            "temperature" decimal(3,2) NOT NULL DEFAULT 0.7,
            "max_tokens" integer NOT NULL DEFAULT 2000,
            "language" character varying(10) NOT NULL DEFAULT 'es',
            "version" integer NOT NULL DEFAULT 1,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "ebook_id" uuid,
            CONSTRAINT "PK_prompts" PRIMARY KEY ("id"),
            CONSTRAINT "FK_prompts_ebook" FOREIGN KEY ("ebook_id") REFERENCES "ebooks"("id") ON DELETE CASCADE
        )`);

        // Crear tabla chapters
        await queryRunner.query(`CREATE TABLE "chapters" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "title" character varying(255) NOT NULL,
            "position" integer NOT NULL,
            "content" text NOT NULL,
            "generated" boolean NOT NULL DEFAULT false,
            "word_count" integer NOT NULL DEFAULT 0,
            "status" "public"."chapters_status_enum" NOT NULL DEFAULT 'draft',
            "estimated_read_time" integer NOT NULL DEFAULT 0,
            "metadata" jsonb,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "ebook_id" uuid,
            CONSTRAINT "PK_chapters" PRIMARY KEY ("id"),
            CONSTRAINT "FK_chapters_ebook" FOREIGN KEY ("ebook_id") REFERENCES "ebooks"("id") ON DELETE CASCADE
        )`);

        // Crear tabla sections
        await queryRunner.query(`CREATE TABLE "sections" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "title" character varying(255),
            "content" text NOT NULL,
            "position" integer NOT NULL,
            "image_url" character varying(255),
            "type" "public"."sections_type_enum" NOT NULL DEFAULT 'text',
            "word_count" integer NOT NULL DEFAULT 0,
            "metadata" jsonb,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "chapter_id" uuid,
            CONSTRAINT "PK_sections" PRIMARY KEY ("id"),
            CONSTRAINT "FK_sections_chapter" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE
        )`);

        // Crear índices
        await queryRunner.query(`CREATE INDEX "IDX_users_email" ON "users" ("email")`);
        await queryRunner.query(`CREATE INDEX "IDX_ebooks_title" ON "ebooks" ("title")`);
        await queryRunner.query(`CREATE INDEX "IDX_ebooks_user" ON "ebooks" ("user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_chapters_title" ON "chapters" ("title")`);
        await queryRunner.query(`CREATE INDEX "IDX_chapters_ebook" ON "chapters" ("ebook_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_sections_chapter" ON "sections" ("chapter_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_prompts_topic" ON "prompts" ("topic")`);
        await queryRunner.query(`CREATE INDEX "IDX_prompts_ebook" ON "prompts" ("ebook_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar índices
        await queryRunner.query(`DROP INDEX "IDX_prompts_ebook"`);
        await queryRunner.query(`DROP INDEX "IDX_prompts_topic"`);
        await queryRunner.query(`DROP INDEX "IDX_sections_chapter"`);
        await queryRunner.query(`DROP INDEX "IDX_chapters_ebook"`);
        await queryRunner.query(`DROP INDEX "IDX_chapters_title"`);
        await queryRunner.query(`DROP INDEX "IDX_ebooks_user"`);
        await queryRunner.query(`DROP INDEX "IDX_ebooks_title"`);
        await queryRunner.query(`DROP INDEX "IDX_users_email"`);

        // Eliminar tablas
        await queryRunner.query(`DROP TABLE "sections"`);
        await queryRunner.query(`DROP TABLE "chapters"`);
        await queryRunner.query(`DROP TABLE "prompts"`);
        await queryRunner.query(`DROP TABLE "ebooks"`);
        await queryRunner.query(`DROP TABLE "users"`);

        // Eliminar enums
        await queryRunner.query(`DROP TYPE "public"."sections_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."chapters_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ebooks_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_auth_provider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }
} 