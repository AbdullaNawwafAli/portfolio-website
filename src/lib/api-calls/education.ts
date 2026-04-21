import {
  createWorkDataDto,
  deleteWorkDataDto,
  WorkData,
} from "@/types/workData"

export async function getWorkApi(): Promise<WorkData[]> {
  const res = await fetch("http://localhost:3000/api/education")
  return res.json()
}

export async function createWorkApi(value: createWorkDataDto) {
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

export async function deleteWorkApi(value: deleteWorkDataDto) {
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
