import { bioData, updateBioDataDto } from "@/types/bioData"

export async function getBioApiCall() {
  const res = await fetch("http://localhost:3000/api/bio")
  const data: bioData = await res.json()
  return data
}

export async function updateBioApiCall({ id, updatedData }: updateBioDataDto) {
  const res = await fetch("http://localhost:3000/api/bio", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, updatedData }),
  })
  const data = await res.json()
  return data
}
