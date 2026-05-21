import NewProjectForm from "@/features/Projects/features/ProjectCreateForm/components/NewProjectForm"
import { Button } from "@/ui/shadcn/button"
import PageHeaderTypography from "@/ui/typography/PageHeaderTypography"
import PageLayoutWrapper from "@/ui/wrappers/PageLayoutWrapper"
import Link from "next/link"

const NewProjectPage = () => {
  return (
    <PageLayoutWrapper>
      <div className="flex justify-between items-center">
        <PageHeaderTypography>New Project</PageHeaderTypography>
        <Button variant="default" className="capitalize font-sans" asChild>
          <Link href="/admin-projects">Back</Link>
        </Button>
      </div>
      <div className="w-full h-full">
        <NewProjectForm />
      </div>
    </PageLayoutWrapper>
  )
}

export default NewProjectPage
