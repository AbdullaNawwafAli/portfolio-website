import { ProjectData } from "@/features/Projects/types/projectData"
import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { getProjectByIdApi } from "../../Projects/services/projects"

interface params {
  projectId: string
}

export default function createProjectByIdQueryOption<
  TData = ProjectData,
  TError = Error,
>(
  params?: params,
  options?: Omit<
    UseQueryOptions<ProjectData, TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["project", params],
    queryFn: () => getProjectByIdApi(params?.projectId as string),
  })
}
