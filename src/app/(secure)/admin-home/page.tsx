import AdminHero from "@/features/Hero/components/AdminHero/AdminHero"
import { getQueryClient } from "@/features/TanStackQuery/utils/getQueryClient"
import { getBioApi } from "@/lib/api-calls/bio"
import { getEducationApi } from "@/lib/api-calls/education"
import { getSkillsApi } from "@/lib/api-calls/skills"
import { getWorkApi } from "@/lib/api-calls/work"
import createBioQueryOptions from "@/features/TanStackQuery/utils/query-options/createBioQueryOptions"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

const AdminHomePage = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    createBioQueryOptions({ staleTime: 1000 * 60 * 5 })
  )

  queryClient.prefetchQuery({
    queryKey: ["education"],
    queryFn: () => getEducationApi(),
  })

  queryClient.prefetchQuery({
    queryKey: ["skills"],
    queryFn: () => getSkillsApi(),
  })

  queryClient.prefetchQuery({
    queryKey: ["work"],
    queryFn: () => getWorkApi(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
        <AdminHero />
      </div>
    </HydrationBoundary>
  )
}

export default AdminHomePage
