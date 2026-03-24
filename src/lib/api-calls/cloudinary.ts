import { OverWriteFileToCloudinaryApiType } from "@/types/cloudinaryData"

export async function uploadFileToCloudinaryApi(base64File: string) {
  const res = await fetch("http://localhost:3000/api/cloudinary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64File: base64File,
      params: { folder: "nextjs_uploads", resource_type: "image" },
    }),
  })
  const data = await res.json()
  return data
}

export async function OverWriteFileToCloudinaryApi({
  base64File,
  bio_picture_cloudinary_id,
  resume_pdf_cloudinary_id,
}: OverWriteFileToCloudinaryApiType) {
  const public_id = bio_picture_cloudinary_id
    ? bio_picture_cloudinary_id
    : resume_pdf_cloudinary_id
  const res = await fetch("http://localhost:3000/api/cloudinary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64File: base64File,
      params: {
        public_id: { public_id },
        overwrite: true,
        invalidate: true,
      },
    }),
  })
  const data = await res.json()
  return data
}
