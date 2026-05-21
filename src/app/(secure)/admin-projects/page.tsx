import AdminPageCards from "@/features/Projects/components/AdminPageCards"
import { getQueryClient } from "@/features/TanStackQuery/lib/getQueryClient"
import createProjectsQueryOptions from "@/features/Projects/hooks/createProjectsQueryOptions"
import { Button } from "@/ui/shadcn/button"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import Link from "next/link"
import PageHeaderTypography from "@/ui/typography/PageHeaderTypography"
import PageLayoutWrapper from "@/ui/wrappers/PageLayoutWrapper"

const AdminProjectsPage = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    createProjectsQueryOptions({ staleTime: 1000 * 60 * 5 })
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayoutWrapper>
        <div className="flex justify-between">
          <PageHeaderTypography>My Projects</PageHeaderTypography>
          <Link href={"/admin-projects/new-project"}>
            <Button className="capitalize font-sans">New Project</Button>
          </Link>
        </div>
        <AdminPageCards />
      </PageLayoutWrapper>
    </HydrationBoundary>
  )
}

export default AdminProjectsPage
