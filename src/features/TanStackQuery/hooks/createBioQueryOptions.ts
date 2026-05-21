import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { bioData } from "@/features/Hero/types/bioData"
import { getBioApi } from "@/features/Hero/services/bio"

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
