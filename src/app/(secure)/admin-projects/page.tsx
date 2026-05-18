import Cards from "@/features/Projects/components/Cards"
import { Button } from "@/ui/shadcn/button"
import Link from "next/link"

const AdminProjectsPage = () => {
  return (
    <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
      <div className="flex justify-between">
        <span className="font-heading text-3xl font-semibold text-primary">
          My Projects
        </span>
        <Link href={"/admin-projects/new-project"}>
          <Button className="capitalize font-sans">New Project</Button>
        </Link>
      </div>
      <Cards />
    </div>
  )
}

export default AdminProjectsPage
