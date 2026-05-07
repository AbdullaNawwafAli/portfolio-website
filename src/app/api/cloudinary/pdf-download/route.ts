import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const publicId = req.nextUrl.searchParams.get("publicId")
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  if (!publicId) {
    return NextResponse.json({ error: "Missing publicId" }, { status: 400 })
  }

  const pdfUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.pdf`

  const response = await fetch(pdfUrl)

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 404 })
  }

  const buffer = await response.arrayBuffer()
  const filename = publicId.split("/").pop() ?? "download"

  return new NextResponse(Buffer.from(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}.pdf"`,
    },
  })
}
