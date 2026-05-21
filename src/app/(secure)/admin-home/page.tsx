import AdminHero from "@/features/Hero/features/Hero/features/AdminHero/components/AdminHero"
import { getQueryClient } from "@/features/TanStackQuery/lib/getQueryClient"
import { getEducationApi } from "@/features/Hero/features/EducationSheet/services/education"
import { getSkillsApi } from "../../../features/Hero/features/SkillSheet/services/skills"
import { getWorkApi } from "../../../features/Hero/features/WorkSheet/services/work"
import createBioQueryOptions from "@/features/TanStackQuery/hooks/createBioQueryOptions"
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
