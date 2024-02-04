DROP TABLE "user_to_project";--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "mentor_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "category" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "student_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
