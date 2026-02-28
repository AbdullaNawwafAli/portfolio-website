import { eq } from "drizzle-orm"
import { db } from "../drizzle"
import { workTable } from "../drizzle/schema"

export async function getWorkDb() {
  const work = await db.query.workTable.findFirst()
  return work
}

export async function updateWorkDb({ id, updatedData }) {
  const work = await db.update(workTable).set({}).where(eq(workTable.id, id))

  return work
}

export async function createWorkDb(createWorkData) {
  const work = await db
    .insert(workTable)
    .values({})
    .returning({ id: workTable.id })
  return work
}
