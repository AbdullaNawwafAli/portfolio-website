import {
  createEducationDb,
  deleteEducationDb,
  getEducationDb,
} from "@/server/db/queries/education"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const work = await getEducationDb()
    if (!work) {
      return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(work)
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching education" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const created = await createEducationDb({
      institute: body.institute,
      startDate: new Date(body.startDate),
      finishDate: new Date(body.finishDate),
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating education" },
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
        message: "Missing id in request",
      })
    }

    const deleted = await deleteEducationDb({ id })

    return NextResponse.json({
      message: "Education entry deleted successfully",
      item: deleted,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting education" },
      { status: 500 }
    )
  }
}
