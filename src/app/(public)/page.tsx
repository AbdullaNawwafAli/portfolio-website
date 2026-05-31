import createEducationQueryOptions from "@/features/Hero/features/EducationSheet/hooks/createEducationQueryOptions"
import Hero from "@/features/Hero/features/Hero/components/Hero"
import createSkillsQueryOptions from "@/features/Hero/features/SkillSheet/hooks/createSkillsQueryOptions"
import createWorkQueryOptions from "@/features/Hero/features/WorkSheet/hooks/createWorkQueryOptions"
import createBioQueryOptions from "@/features/Hero/hooks/createBioQueryOptions"
import AdminPageCards from "@/features/Projects/components/AdminPageCards"
import { getQueryClient } from "@/features/TanStackQuery/lib/getQueryClient"
import PageLayoutWrapper from "@/ui/wrappers/PageLayoutWrapper"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function Home() {
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
      <PageLayoutWrapper className="gap-2 justify-between">
        <Hero />
        <AdminPageCards />
      </PageLayoutWrapper>
    </HydrationBoundary>
  )
}
