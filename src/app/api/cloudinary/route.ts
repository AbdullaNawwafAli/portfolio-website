import { v2 as cloudinary } from "cloudinary"
import { NextResponse } from "next/server"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
})

export async function POST(request: Request) {
  const { base64File } = await request.json()

  try {
    const result = await cloudinary.uploader.upload(base64File, {
      folder: "nextjs_uploads",
    })
    console.log("not")

    return NextResponse.json({ publicId: result.public_id })
  } catch (error) {
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 }
    )
  }
}
