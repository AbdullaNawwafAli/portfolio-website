import { eq } from "drizzle-orm"
import { db } from "../drizzle"
import { bioTable } from "../drizzle/schema"
import { createBioDataDto, updateBioDataDto } from "@/types/bioData"

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
      instagram_url: updatedData.instagram_url,
      linked_in_url: updatedData.linked_in_url,
      github_url: updatedData.github_url,
    })
    .where(eq(bioTable.id, id))

  return bio
}

export async function createBioDb(createBioData: createBioDataDto) {
  const bio = await db
    .insert(bioTable)
    .values({
      bio_picture_cloudinary_id: createBioData.bio_picture_cloudinary_id,
      name: createBioData.name,
      name_subtext: createBioData.name_subtext,
      hero_description: createBioData.hero_description,
      email: createBioData.email,
      resume_pdf_cloudinary_id: createBioData.resume_pdf_cloudinary_id,
      instagram_url: createBioData.instagram_url,
      linked_in_url: createBioData.linked_in_url,
      github_url: createBioData.github_url,
    })
    .returning({ id: bioTable.id })
  return bio
}
