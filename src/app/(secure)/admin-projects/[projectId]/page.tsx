import { getQueryClient } from "@/features/TanStackQuery/lib/getQueryClient"
import createProjectByIdQueryOption from "@/features/TanStackQuery/hooks/createProjectByIdQueryOption"
import { Button } from "@/ui/shadcn/button"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import Link from "next/link"

interface AdminViewProjectPageProps {
  params: Promise<{ projectId: string }>
}

const AdminViewProjectPage = async ({ params }: AdminViewProjectPageProps) => {
  const { projectId } = await params

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    createProjectByIdQueryOption(
      { projectId: projectId },
      { staleTime: 1000 * 60 * 5 }
    )
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6 flex-1 h-full py-10 w-full">
        <div className="flex justify-between items-center">
          <span className="font-heading text-3xl font-semibold text-primary"></span>
          <Link href="/admin-projects">
            <Button variant="default" className="capitalize font-sans">
              Back
            </Button>
          </Link>
        </div>
        <div className="w-full h-full"></div>
      </div>
    </HydrationBoundary>
  )
}

export default AdminViewProjectPage
