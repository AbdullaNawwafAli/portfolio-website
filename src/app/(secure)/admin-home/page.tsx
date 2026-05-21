import AdminHero from "@/features/Hero/features/AdminHero/components/AdminHero"
import { getQueryClient } from "@/features/TanStackQuery/lib/getQueryClient"
import { getEducationApi } from "@/features/Hero/features/EducationSheet/services/education"
import { getSkillsApi } from "../../../features/Hero/features/SkillSheet/services/skills"
import { getWorkApi } from "../../../features/Hero/features/WorkSheet/services/work"
import createBioQueryOptions from "@/features/Hero/hooks/createBioQueryOptions"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import createEducationQueryOptions from "@/features/Hero/features/EducationSheet/hooks/createEducationQueryOptions"
import createSkillsQueryOptions from "@/features/Hero/features/SkillSheet/hooks/createSkillsQueryOptions"
import createWorkQueryOptions from "@/features/Hero/features/WorkSheet/hooks/createWorkQueryOptions"
import PageLayoutWrapper from "@/ui/wrappers/PageLayoutWrapper"

const AdminHomePage = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    createBioQueryOptions({ staleTime: 1000 * 60 * 5 })
  )

  queryClient.prefetchQuery(
    createEducationQueryOptions({ staleTime: 1000 * 60 * 5 })
  )

  queryClient.prefetchQuery(
    createSkillsQueryOptions({ staleTime: 1000 * 60 * 5 })
  )

  queryClient.prefetchQuery(
    createWorkQueryOptions({ staleTime: 1000 * 60 * 5 })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayoutWrapper className="justify-between gap-2">
        <AdminHero />
      </PageLayoutWrapper>
    </HydrationBoundary>
  )
}

export default AdminHomePage
