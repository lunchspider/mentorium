import { projects } from "@/db/schema";
import { getUser } from "./auth";
import { db } from '@/db';

export async function create_project(data: { name: string, description: string, category: string }) {
    try {
        const user = await getUser();
        if (!user) {
            throw 'not logged in!';
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


export async function get_projects() {
    try {
        return db.select().from(projects);
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}