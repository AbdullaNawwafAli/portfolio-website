import { WorkData } from "@/types/workData"
import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { getWorkApi } from "../api-calls/work"

export default function createWorkQueryOptions<
  TData = WorkData[],
  TError = Error,
>(
  options?: Omit<
    UseQueryOptions<WorkData[], TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["work"],
    queryFn: () => getWorkApi(),
  })
}
