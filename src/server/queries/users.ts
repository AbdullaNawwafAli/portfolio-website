"use server"

import { db } from "@/server/db/drizzle"
import { usersTable } from "../db/drizzle/schema/users"

export async function getUsers() {
    const users = await db.select().from(usersTable)
    return users
}
