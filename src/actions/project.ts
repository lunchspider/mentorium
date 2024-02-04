'use server';

import { projects, Project } from "@/db/schema";
import { getUser } from "./auth";
import { db } from '@/db';
import { eq, or } from "drizzle-orm";

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
