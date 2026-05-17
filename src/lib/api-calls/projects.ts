import {
  createProjectDataDto,
  ProjectData,
} from "@/types/projectData"

export async function getProjectsApi(): Promise<ProjectData[]> {
  const res = await fetch("http://localhost:3000/api/projects")
  return res.json()
}

export async function createProjectApi(value: createProjectDataDto) {
  const res = await fetch("http://localhost:3000/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  })

  if (!res.ok) {
    throw new Error("Failed to create project")
  }

  return res.json()
}
