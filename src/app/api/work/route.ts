import { getWorkDb } from "@/server/db/queries/work"
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
