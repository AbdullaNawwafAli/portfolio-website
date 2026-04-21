import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { EducationData } from "@/types/educationData"
import { getEducationApi } from "../api-calls/education"

export default function createEducationQueryOptions<
  TData = EducationData[],
  TError = Error,
>(
  options?: Omit<
    UseQueryOptions<EducationData[], TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["education"],
    queryFn: () => getEducationApi(),
  })
}
