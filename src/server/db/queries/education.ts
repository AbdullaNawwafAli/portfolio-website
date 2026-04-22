import { eq } from "drizzle-orm"
import { db } from "../drizzle"
import { educationTable } from "../drizzle/schema"
import {
  createEducationDataDto,
  deleteEducationDataDto,
  updateEducationDataDto,
} from "@/types/educationData"

export async function getEducationDb() {
  const work = await db.query.educationTable.findMany()
  return work
}

export async function updateEducationDb({
  id,
  updatedData,
}: updateEducationDataDto) {
  const work = await db
    .update(educationTable)
    .set({
      institute: updatedData.institute,
      startDate: updatedData.startDate,
      finishDate: updatedData.finishDate,
    })
    .where(eq(educationTable.id, id))

  return work
}

export async function createEducationDb(
  createEducationData: createEducationDataDto
) {
  const work = await db
    .insert(educationTable)
    .values({
      institute: createEducationData.institute,
      country: createEducationData.country,
      startDate: createEducationData.startDate,
      finishDate: createEducationData.finishDate,
    })
    .returning({ id: educationTable.id })
  return work
}

export async function deleteEducationDb({ id }: deleteEducationDataDto) {
  const work = await db.delete(educationTable).where(eq(educationTable.id, id))

  return work
}
