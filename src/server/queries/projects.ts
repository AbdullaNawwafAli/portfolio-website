import { db } from "../db/drizzle";

export async function getProjects() {
  const projects = await db.query.projects.findMany({
    columns: { name: true },
    with: {
      media: {
        columns: {
          cloudinaryId: true,
        },
      },
    },
  });
  return projects;
}
