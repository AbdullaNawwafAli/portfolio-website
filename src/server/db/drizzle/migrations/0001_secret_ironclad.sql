CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"cloudinary_id" varchar(255) NOT NULL,
	"url" varchar(512) NOT NULL,
	"type" varchar(50),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" varchar(1024) NOT NULL,
	"createdDate" varchar(255) NOT NULL,
	"imgUrl" varchar(512) NOT NULL
);
