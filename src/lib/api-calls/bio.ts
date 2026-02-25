import { bioData, createBioDataDto, updateBioDataDto } from "@/types/bioData"

export async function getBioApi(): Promise<bioData> {
  const res = await fetch("http://localhost:3000/api/bio")
  return res.json()
}

export async function createBioApi(createBioData: createBioDataDto) {
  const res = await fetch("http://localhost:3000/api/bio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ createBioData }),
  })
  const data = await res.json()
  return data
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
