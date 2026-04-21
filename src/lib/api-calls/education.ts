import {
  createEducationDataDto,
  deleteEducationDataDto,
  EducationData,
} from "@/types/educationData"

export async function getEducationApi(): Promise<EducationData[]> {
  const res = await fetch("http://localhost:3000/api/education")
  return res.json()
}

export async function createEducationApi(value: createEducationDataDto) {
  const res = await fetch("http://localhost:3000/api/education", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  })

  if (!res.ok) {
    throw new Error("Failed to create education")
  }

  return res.json()
}

export async function deleteEducationApi(value: deleteEducationDataDto) {
  const res = await fetch("http://localhost:3000/api/education", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  })

  if (!res.ok) {
    throw new Error("Failed to delete education")
  }

  return res.json()
}
