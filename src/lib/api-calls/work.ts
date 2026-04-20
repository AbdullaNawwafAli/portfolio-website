import {
  createWorkDataDto,
  deleteWorkDataDto,
  WorkData,
} from "@/types/workData"

export async function getWorkApi(): Promise<WorkData[]> {
  const res = await fetch("http://localhost:3000/api/work")
  return res.json()
}

export async function createWorkApi(value: createWorkDataDto) {
  const res = await fetch("http://localhost:3000/api/work", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  })

  if (!res.ok) {
    throw new Error("Failed to create work")
  }

  return res.json()
}

export async function deleteWorkApi(value: deleteWorkDataDto) {
  const res = await fetch("http://localhost:3000/api/work", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  })

  if (!res.ok) {
    throw new Error("Failed to delete work")
  }

  return res.json()
}
