ALTER TABLE "work" ALTER COLUMN "finish_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "education" ADD COLUMN "country" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "work" ADD COLUMN "country" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "work" ADD COLUMN "city" varchar(255) NOT NULL;