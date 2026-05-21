import {
  createProjectDb,
  getProjectsDb,
} from "@/features/Projects/queries/projects"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const projects = await getProjectsDb()
    if (!projects) {
      return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const created = await createProjectDb({
      name: body.name,
      description: body.description,
      startDate: new Date(body.startDate),
      finishDate: new Date(body.finishDate),
      order: body.order,
      featured: body.featured,
      media: body.media,
      tags: body.tags,
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating project" },
      { status: 500 }
    )
  }
}
