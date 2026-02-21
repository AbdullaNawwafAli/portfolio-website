import { bioData, updateBioDataDto } from "@/types/bioData"

export async function getBioApi() {
  const res = await fetch("http://localhost:3000/api/bio")
  if (res.status === 204) return null
  if (!res.ok) throw new Error("Error fetching bio")
  return res.json() as Promise<bioData>
}

export async function updateBioApi({ id, updatedData }: updateBioDataDto) {
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
