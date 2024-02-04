-- Custom SQL migration file, put you code below! --
ALTER TABLE "projects" ADD COLUMN "ts" tsvector generated always as (to_tsvector('english', name || ' ' || description || ' ' || category)) stored;

ALTER TABLE "tech_stacks" ADD COLUMN "ts" tsvector generated always as (to_tsvector('english', name)) stored;
