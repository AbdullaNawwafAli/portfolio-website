import { eq } from "drizzle-orm"
import { db } from "../drizzle"
import { bioTable } from "../drizzle/schema"

export async function getBio() {
  const bio = await db.query.bioTable.findFirst()
  return bio
}

interface bioPayload {
  name: string
  name_subtext: string
  hero_description: string
  email: string
  resume_pdf_cloudinary_id: string
  instagram_url: string
  linked_in_url: string
  github_url: string
}

export async function updateBio(id: string, data: bioPayload) {
  const bio = await db
    .update(bioTable)
    .set({
      name: data.name,
      name_subtext: data.name_subtext,
      hero_description: data.hero_description,
      email: data.email,
      resume_pdf_cloudinary_id: data.resume_pdf_cloudinary_id,
      instagram_url: data.instagram_url,
      linked_in_url: data.linked_in_url,
      github_url: data.github_url,
    })
    .where(eq(bioTable.id, id))
}
