import { getEducationApi } from "@/features/Hero/features/EducationSheet/services/education"
import { EducationData } from "@/features/Hero/features/EducationSheet/types/educationData"
import { queryOptions, UseQueryOptions } from "@tanstack/react-query"

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
