import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar, primaryKey } from 'drizzle-orm/pg-core';
import { tsvector } from './utils';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    role: varchar('role').default('student').notNull(),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
});

export type User = typeof users.$inferSelect;

export const projects = pgTable('projects', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    description: varchar('description').notNull(),
    category: varchar('category').notNull(),
    mentor_id: uuid('mentor_id').references(() => users.id),
    student_id: uuid('student_id').references(() => users.id).notNull(),
    ts: tsvector('ts'),
    chat_room_id: uuid('chat_room_id').references(() => chat_rooms.id)
});

export type Project = typeof projects.$inferSelect;

export const tech_stacks = pgTable('tech_stacks', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    ts: tsvector('ts')
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

export const chat_rooms = pgTable('chat_rooms', {
    id: uuid('id').primaryKey().defaultRandom(),
});

export const chat_rooms_to_users = pgTable('chat_rooms_to_users', {
    chat_room_id: uuid('chat_room_id').notNull(),
    user_id: uuid('user_id').notNull(),
});

export const messages = pgTable('messages', {
    id: uuid('id').primaryKey().defaultRandom(),
    content: varchar('content').notNull(),
    sender_id: uuid('sender_id').references(() => users.id).notNull(),
    chat_room_id: uuid('chat_room_id').references(() => projects.id).notNull(),
});

export const Message = typeof messages.$inferSelect;
