import { db } from "../drizzle"

export async function getProjects() {
  const projects = await db.query.skillTypeTable.findMany({
    columns: { skill_type_name: true },
    with: {
      skill_info: {
        columns: {
          skill_type_id: true,
          skill_name: true,
          skill_logo_cloudinary_id: true,
        },
      },
    },
  })
  return projects
}
