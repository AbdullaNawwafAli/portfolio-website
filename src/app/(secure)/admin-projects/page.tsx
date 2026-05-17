import { Button } from "@/ui/shadcn/button"
import Link from "next/link"
import React from "react"

const AdminProjectsPage = () => {
  return (
    <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
      <div className="flex justify-between">
        <span>Projects</span>
        <Link href={"/admin-projects/new-project"}>
          <Button className="capitalize font-sans">New Project</Button>
        </Link>
      </div>
    </div>
  )
}

export default AdminProjectsPage
