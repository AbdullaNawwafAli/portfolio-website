import { eq } from "drizzle-orm"
import { db } from "../drizzle"
import { bioTable } from "../drizzle/schema"
import { updateBioDataDto } from "@/types/bioData"

export async function getBioDb() {
  const bio = await db.query.bioTable.findFirst()
  return bio
}

export async function updateBioDb({ id, updatedData }: updateBioDataDto) {
  const bio = await db
    .update(bioTable)
    .set({
      name: updatedData.name,
      name_subtext: updatedData.name_subtext,
      hero_description: updatedData.hero_description,
      email: updatedData.email,
      resume_pdf_cloudinary_id: updatedData.resume_pdf_cloudinary_id,
      instagram_url: updatedData.instagram_url,
      linked_in_url: updatedData.linked_in_url,
      github_url: updatedData.github_url,
    })
    .where(eq(bioTable.id, id))

  return bio
}
