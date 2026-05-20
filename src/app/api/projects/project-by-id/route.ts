import { getProjectByIdDb } from "@/server/db/queries/projects"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")
    const projects = await getProjectByIdDb(id as string)

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
