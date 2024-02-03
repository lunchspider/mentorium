import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar, primaryKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    role: varchar('role').default('student').notNull(),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
    userProjects: many(user_to_project),
}));

export type User = typeof users.$inferSelect;

export const projects = pgTable('projects', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    description: varchar('description').notNull(),
    mentor_id: uuid('mentor_id').references(() => users.id).notNull(),
});

export type Projects = typeof projects.$inferSelect;

export const tech_stacks = pgTable('tech_stacks', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
});


export const projectRelations = relations(projects, ({ many }) => ({
    projectTechStacks: many(project_to_tech_stack),
}));

export type TechStack = typeof tech_stacks.$inferSelect;

export const project_to_tech_stack = pgTable('project_to_tech_stack', {
    tech_stack_id: uuid('tech_stack_id')
        .notNull()
        .references(() => tech_stacks.id),
    project_id: uuid('project_id')
        .notNull()
        .references(() => projects.id)
}, (table) => ({ pk: primaryKey({ columns: [table.project_id, table.tech_stack_id] }) }))


export const user_to_project = pgTable('user_to_project', {
    project_id: uuid('project_id')
        .notNull()
        .references(() => projects.id),
    user_id: uuid('user_id')
        .notNull()
        .references(() => users.id)
}, (table) => ({ pk: primaryKey({ columns: [table.project_id, table.user_id] }) }))
