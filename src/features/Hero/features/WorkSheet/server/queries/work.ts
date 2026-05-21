import { eq } from "drizzle-orm"
import {
  createWorkDataDto,
  deleteWorkDataDto,
  updateWorkDataDto,
} from "@/features/Hero/features/WorkSheet/types/workData"
import { db } from "@/server/db/drizzle"
import { workTable } from "@/server/db/drizzle/schema"

export async function getWorkDb() {
  const work = await db.query.workTable.findMany()
  return work
}

export async function updateWorkDb({ id, updatedData }: updateWorkDataDto) {
  const work = await db
    .update(workTable)
    .set({
      company_name: updatedData.company_name,
      job_title: updatedData.job_title,
      startDate: updatedData.startDate,
      finishDate: updatedData.finishDate,
      responsibilities: updatedData.responsibilities,
    })
    .where(eq(workTable.id, id))

  return work
}

export async function createWorkDb(createWorkData: createWorkDataDto) {
  const work = await db
    .insert(workTable)
    .values({
      company_name: createWorkData.company_name,
      job_title: createWorkData.job_title,
      country: createWorkData.country,
      city: createWorkData.city,
      startDate: createWorkData.startDate,
      finishDate: createWorkData.finishDate,
      responsibilities: createWorkData.responsibilities ?? [],
    })
    .returning({ id: workTable.id })
  return work
}

export async function deleteWorkDb({ id }: deleteWorkDataDto) {
  const work = await db.delete(workTable).where(eq(workTable.id, id))

  return work
}
