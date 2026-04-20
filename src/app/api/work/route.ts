import { createWorkDb, getWorkDb } from "@/server/db/queries/work"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const work = await getWorkDb()
    if (!work) {
      return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(work)
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching work" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const created = await createWorkDb({
      company_name: body.company_name,
      job_title: body.job_title,
      country: body.country,
      city: body.city,
      startDate: new Date(body.startDate),
      finishDate: body.finishDate ? new Date(body.finishDate) : undefined,
      responsibilities: body.responsibilities,
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating work" },
      { status: 500 }
    )
  }
}
