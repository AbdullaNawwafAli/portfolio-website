import NewProjectForm from "@/features/Projects/components/NewProjectForm"
import { Button } from "@/ui/shadcn/button"
import Link from "next/link"

const NewProjectPage = () => {
  return (
    <div className="flex flex-col gap-6 flex-1 h-full py-10 w-full">
      <div className="flex justify-between items-center">
        <span className="font-heading text-3xl font-semibold text-primary">
          New Project
        </span>
        <Link href="/admin-projects">
          <Button variant="default" className="capitalize font-sans">
            Back
          </Button>
        </Link>
      </div>
      <div className="w-full h-full">
        <NewProjectForm />
      </div>
    </div>
  )
}

export default NewProjectPage
