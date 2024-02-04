'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';


export async function update_user_details(id: string, name: string, email: string) {
    try {
        return db.update(users).set({name: name, email:email}).where(eq(users.id, id)).returning()
            .then((res) => res[0]);
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}