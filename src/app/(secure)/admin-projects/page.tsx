import AdminPageCards from "@/features/Projects/components/AdminPageCards"
import { getQueryClient } from "@/features/TanStackQuery/utils/getQueryClient"
import createProjectsQueryOptions from "@/features/TanStackQuery/utils/query-options/createProjectsQueryOptions"
import { Button } from "@/ui/shadcn/button"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import Link from "next/link"

const AdminProjectsPage = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    createProjectsQueryOptions({ staleTime: 1000 * 60 * 5 })
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-2 flex-1 h-full py-10 w-full">
        <div className="flex justify-between">
          <span className="font-heading text-3xl font-semibold text-primary">
            My Projects
          </span>
          <Link href={"/admin-projects/new-project"}>
            <Button className="capitalize font-sans">New Project</Button>
          </Link>
        </div>
        <AdminPageCards />
      </div>
    </HydrationBoundary>
  )
}

export default AdminProjectsPage
