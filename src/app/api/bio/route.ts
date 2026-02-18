import { getBio, updateBio } from "@/server/db/queries/bio"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const bio = await getBio()
  return NextResponse.json(bio)
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, updatedData } = body
    if (!id || !updatedData) {
      return NextResponse.json({
        message: "Missing id or updatedData in request",
      })
    }

    const updateItem = updateBio(id, updatedData)

    return NextResponse.json({
      message: "Bio updated successfully",
      item: updateItem,
    })
  } catch (error) {
    return NextResponse.json({ message: "Error updating bio" }, { status: 500 })
  }
}
