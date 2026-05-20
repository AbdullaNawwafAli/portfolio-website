import NewProjectForm from "@/features/Projects/components/CreateNewProject/NewProjectForm"
import { Button } from "@/ui/shadcn/button"
import Link from "next/link"

interface AdminViewProjectPageProps {
  params: Promise<{ projectId: string }>
}

const AdminViewProjectPage = async ({ params }: AdminViewProjectPageProps) => {
  const { projectId } = await params

  console.log("projectId", projectId)
  return (
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
  )
}

export default AdminViewProjectPage
