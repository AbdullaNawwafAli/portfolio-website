import { ProjectData } from "@/types/projectData"
import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { getProjectsApi } from "../api-calls/projects"

export default function createProjectsQueryOptions<
  TData = ProjectData[],
  TError = Error,
>(
  options?: Omit<
    UseQueryOptions<ProjectData[], TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["projects"],
    queryFn: () => getProjectsApi(),
  })
}
