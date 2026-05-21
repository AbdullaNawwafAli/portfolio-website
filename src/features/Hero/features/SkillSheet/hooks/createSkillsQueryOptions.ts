import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { getSkillsApi } from "../services/skills"
import { SkillsData } from "@/features/Hero/features/SkillSheet/types/skills"

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
