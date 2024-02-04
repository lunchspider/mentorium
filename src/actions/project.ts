'use server';

import { projects, Project, users } from "@/db/schema";
import { getUser } from "./auth";
import { db } from '@/db';
import { eq, or, sql } from "drizzle-orm";

export async function create_project(data: { name: string, description: string, category: string }) {
    try {
        const user = await getUser();
        if (!user) {
            throw 'user is not authed'
        }
        if (user.role !== "student") {
            throw 'not a student';
        }

        return db.insert(projects)
            .values({ ...data, student_id: user.id })
            .returning({ id: projects.id })
            .then((res) => res[0]);
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}


export async function get_projects_with_user_id(id: string) {
    try {
        return db
            .select({ id: projects.id })
            .from(projects)
            .where(or(eq(projects.student_id, id), eq(projects.mentor_id, id)));
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

export async function get_project(id: string): Promise<Project | undefined> {
    try {
        return db
            .select()
            .from(projects)
            .where(eq(projects.id, id))
            .limit(1)
            .then((res) => res[0])
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

export async function get_all_project(): Promise<Project[]> {
    try {
        return db
            .select()
            .from(projects)
            .limit(20);
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

export async function update_project(data: { id: string, name: string, description: string, category: string, }) {
    try {
        return db.update(projects).set(data).where(eq(projects.id, data.id)).returning()
            .then((res) => res[0]);
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

export async function get_mentor_of_project(id: string) {
    try {
        return db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1)
            .then((res) => res[0]);
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

export async function join_project(projectId: string, teacherId: string) {
    try {
        return db
            .update(projects)
            .set({ mentor_id: teacherId })
            .where(eq(projects.id, projectId))
            .returning()
            .then((res) => res[0]);
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

export async function search_project(search_string: string) {
    try {
        return db
            .select()
            .from(projects)
            .orderBy(sql`ts_rank(ts @@ phraseto_tsquery('english', ${search_string})) DESC`)
            .limit(20)
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}
