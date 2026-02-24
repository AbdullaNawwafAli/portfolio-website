export async function uploadFileToCloudinaryApi(base64File: string) {
  const res = await fetch("http://localhost:3000/api/cloudinary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ base64File: base64File }),
  })
  const data = await res.json()
  return data
}
