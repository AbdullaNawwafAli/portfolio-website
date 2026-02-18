import { db } from "../drizzle"

export async function getProjects() {
  const projects = await db.query.projectsTable.findMany({
    columns: { name: true },
    with: {
      media: {
        columns: {
          cloudinaryId: true,
        },
      },
    },
  })
  return projects
}
