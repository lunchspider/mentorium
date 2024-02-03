CREATE TABLE IF NOT EXISTS "project_to_tech_stack" (
	"tech_stack_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	CONSTRAINT "project_to_tech_stack_project_id_tech_stack_id_pk" PRIMARY KEY("project_id","tech_stack_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"mentor_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tech_stacks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_to_project" (
	"project_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "user_to_project_project_id_user_id_pk" PRIMARY KEY("project_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'student' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_to_tech_stack" ADD CONSTRAINT "project_to_tech_stack_tech_stack_id_tech_stacks_id_fk" FOREIGN KEY ("tech_stack_id") REFERENCES "tech_stacks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_to_tech_stack" ADD CONSTRAINT "project_to_tech_stack_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_mentor_id_users_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_to_project" ADD CONSTRAINT "user_to_project_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_to_project" ADD CONSTRAINT "user_to_project_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
