import {
  createSkillsDataDto,
  deleteSkillsDataDto,
  SkillsData,
} from "@/types/skills"

export async function getSkillsApi(): Promise<SkillsData[]> {
  const res = await fetch("http://localhost:3000/api/skills")
  return res.json()
}

export async function createSkillsApi(value: createSkillsDataDto) {
  const res = await fetch("http://localhost:3000/api/skills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  })

  if (!res.ok) {
    throw new Error("Failed to create skills")
  }

  return res.json()
}

export async function deleteSkillsApi(value: deleteSkillsDataDto) {
  const res = await fetch("http://localhost:3000/api/skills", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  })

  if (!res.ok) {
    throw new Error("Failed to delete skills")
  }

  return res.json()
}
