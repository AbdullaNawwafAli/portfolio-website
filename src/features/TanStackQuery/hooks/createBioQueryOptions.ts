import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { getBioApi } from "../../Hero/features/Hero/services/bio"
import { bioData } from "@/features/Hero/features/Hero/types/bioData"

export default function createBioQueryOptions<TData = bioData, TError = Error>(
  options?: Omit<
    UseQueryOptions<bioData, TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["bio"],
    queryFn: () => getBioApi(),
  })
}

/** 
 * example of a the structure with params
 * 
interface params {
  page: number
}
export default function createBioQueryOptions<TData = bioData, TError = Error>(
    params?:params,
  options?: Omit<
    UseQueryOptions<bioData, TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["bio",params],
    queryFn: () => getBio(params),
  })
}
*/
