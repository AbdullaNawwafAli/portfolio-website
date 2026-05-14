import {
  createSkillsDb,
  deleteSkillsDb,
  getSkillsDb,
} from "@/server/db/queries/skills"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const skills = await getSkillsDb()
    if (!skills) {
      return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching skills" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const created = await createSkillsDb({
      skill_type_name: body.skill_type_name,
      skills: body.skills,
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating skills" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()

    const { id } = body
    if (!id) {
      return NextResponse.json({
        message: "Missing id  in request",
      })
    }

    const deleted = await deleteSkillsDb({ id })
    console.log(deleted, "skills in route")
    return NextResponse.json({
      message: "skills entry deleted successfully",
      item: deleted,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting skills" },
      { status: 500 }
    )
  }
}
