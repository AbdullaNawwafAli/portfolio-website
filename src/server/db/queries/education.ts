import { eq } from "drizzle-orm"
import { db } from "../drizzle"
import { educationTable } from "../drizzle/schema"
import {
  createEducationDataDto,
  deleteEducationDataDto,
  updateEducationDataDto,
} from "@/features/EducationSheet/types/educationData"

export async function getEducationDb() {
  const education = await db.query.educationTable.findMany()
  return education
}

export async function updateEducationDb({
  id,
  updatedData,
}: updateEducationDataDto) {
  const education = await db
    .update(educationTable)
    .set({
      institute: updatedData.institute,
      country: updatedData.country,
      study: updatedData.study,
      startDate: updatedData.startDate,
      finishDate: updatedData.finishDate,
    })
    .where(eq(educationTable.id, id))

  return education
}

export async function createEducationDb(
  createEducationData: createEducationDataDto
) {
  const education = await db
    .insert(educationTable)
    .values({
      institute: createEducationData.institute,
      country: createEducationData.country,
      study: createEducationData.study,
      startDate: createEducationData.startDate,
      finishDate: createEducationData.finishDate,
    })
    .returning({ id: educationTable.id })
  return education
}

export async function deleteEducationDb({ id }: deleteEducationDataDto) {
  const education = await db
    .delete(educationTable)
    .where(eq(educationTable.id, id))

  return education
}
