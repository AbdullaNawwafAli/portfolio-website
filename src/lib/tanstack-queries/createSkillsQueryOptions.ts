import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { getSkillsApi } from "../api-calls/skills"
import { SkillsData } from "@/types/skills"

export default function createSkillsQueryOptions<
  TData = SkillsData[],
  TError = Error,
>(
  options?: Omit<
    UseQueryOptions<SkillsData[], TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["skills"],
    queryFn: () => getSkillsApi(),
  })
}
