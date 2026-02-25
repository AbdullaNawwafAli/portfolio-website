CREATE TYPE "public"."mediaType" AS ENUM('img', 'vid');--> statement-breakpoint
CREATE TABLE "bio" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bio_picture_cloudinary_id" varchar(255) NOT NULL,
	"name" varchar(100) NOT NULL,
	"name_subtext" varchar(100) NOT NULL,
	"hero_description" text NOT NULL,
	"email" varchar(100) NOT NULL,
	"resume_pdf_cloudinary_id" varchar(255) NOT NULL,
	"instagram_url" varchar(255) NOT NULL,
	"linked_in_url" varchar(255) NOT NULL,
	"github_url" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"institute" varchar(255) NOT NULL,
	"start_date" timestamp NOT NULL,
	"finish_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"cloudinary_id" varchar(255) NOT NULL,
	"mediaType" "mediaType" DEFAULT 'img' NOT NULL,
	"description" varchar(255) NOT NULL,
	"alt_text" varchar(50) NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(1024) NOT NULL,
	"start_date" timestamp NOT NULL,
	"finish_date" timestamp NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"featured" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects_tags_relation_table" (
	"project_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "projects_tags_relation_table_project_id_tag_id_pk" PRIMARY KEY("project_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "projects_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skill_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"skill_type_id" uuid NOT NULL,
	"skill_logo_cloudinary_id" varchar(255) NOT NULL,
	"skill_name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skill_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"skill_type_name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "work" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"job_title" varchar(255) NOT NULL,
	"start_date" timestamp NOT NULL,
	"finish_date" timestamp NOT NULL,
	" responsibilities" text[] DEFAULT ARRAY[]::text[] NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects_media" ADD CONSTRAINT "projects_media_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_tags_relation_table" ADD CONSTRAINT "projects_tags_relation_table_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_tags_relation_table" ADD CONSTRAINT "projects_tags_relation_table_tag_id_projects_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."projects_tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill_info" ADD CONSTRAINT "skill_info_skill_type_id_skill_type_id_fk" FOREIGN KEY ("skill_type_id") REFERENCES "public"."skill_type"("id") ON DELETE no action ON UPDATE no action;