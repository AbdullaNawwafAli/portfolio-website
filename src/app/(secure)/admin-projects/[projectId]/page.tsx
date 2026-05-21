import { getQueryClient } from "@/features/TanStackQuery/lib/getQueryClient"
import createProjectByIdQueryOption from "@/features/Projects/hooks/createProjectByIdQueryOption"
import { Button } from "@/ui/shadcn/button"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import Link from "next/link"
import PageHeaderTypography from "@/ui/typography/PageHeaderTypography"
import PageLayoutWrapper from "@/ui/wrappers/PageLayoutWrapper"

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
      <PageLayoutWrapper>
        <div className="flex justify-between items-center">
          <PageHeaderTypography>Project Details</PageHeaderTypography>

          <Button asChild variant="default" className="capitalize font-sans">
            <Link href="/admin-projects">Back</Link>
          </Button>
        </div>
        <div className="w-full h-full"></div>
      </PageLayoutWrapper>
    </HydrationBoundary>
  )
}

export default AdminViewProjectPage
