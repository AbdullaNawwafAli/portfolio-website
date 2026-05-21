import { eq } from "drizzle-orm"
import { createProjectDataDto } from "@/types/projectData"
import { db } from "@/server/db/drizzle"
import {
  projectsTable,
  projectsMediaTable,
  projectsTagsTable,
  projectsTagsRelationTable,
} from "@/server/db/drizzle/schema"

export async function getProjectsDb() {
  const projects = await db.query.projectsTable.findMany({
    with: {
      media: true,
      tags: {
        with: {
          tag: true,
        },
      },
    },
  })

  return projects.map((project) => ({
    ...project,
    tags: project.tags.map((t) => ({ id: t.tag.id, text: t.tag.text })),
  }))
}

export async function createProjectDb(createProjectData: createProjectDataDto) {
  const [project] = await db
    .insert(projectsTable)
    .values({
      name: createProjectData.name,
      description: createProjectData.description,
      startDate: createProjectData.startDate,
      finishDate: createProjectData.finishDate,
      order: createProjectData.order ?? 0,
      featured: createProjectData.featured,
    })
    .returning({ id: projectsTable.id })

  if (createProjectData.media?.length) {
    await db.insert(projectsMediaTable).values(
      createProjectData.media.map((media) => ({
        projectId: project.id,
        cloudinaryId: media.cloudinaryId,
        type: media.type,
        description: media.description,
        alt: media.alt,
        order: media.order ?? 0,
      }))
    )
  }

  if (createProjectData.tags?.length) {
    for (const tagText of createProjectData.tags) {
      const existing = await db.query.projectsTagsTable.findFirst({
        where: eq(projectsTagsTable.text, tagText),
      })

      let tagId: string
      if (existing) {
        tagId = existing.id
      } else {
        const [created] = await db
          .insert(projectsTagsTable)
          .values({ text: tagText })
          .returning({ id: projectsTagsTable.id })
        tagId = created.id
      }

      await db.insert(projectsTagsRelationTable).values({
        projectId: project.id,
        tagId,
      })
    }
  }

  return project
}

export async function getProjectByIdDb(id: string) {
  const projects = await db.query.projectsTable.findMany({
    where: eq(projectsTable.id, id),
    with: {
      media: true,
      tags: {
        with: {
          tag: true,
        },
      },
    },
  })

  return projects.map((project) => ({
    ...project,
    tags: project.tags.map((t) => ({ id: t.tag.id, text: t.tag.text })),
  }))[0]
}
