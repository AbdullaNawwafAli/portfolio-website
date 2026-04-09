import { WorkData } from "@/types/workData"

export async function getWorkApi(): Promise<WorkData[]> {
  const res = await fetch("http://localhost:3000/api/work")
  return res.json()
}
