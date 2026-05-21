import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { EducationData } from "@/features/EducationSheet/types/educationData"
import { getEducationApi } from "../../EducationSheet/services/education"

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
