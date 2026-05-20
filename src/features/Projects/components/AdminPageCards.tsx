"use client"
import { useQuery } from "@tanstack/react-query"
import { Button } from "../../../ui/shadcn/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../ui/shadcn/card"
import Image from "next/image"
import createProjectsQueryOptions from "@/lib/tanstack-queries/createProjectsQueryOptions"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/ui/shadcn/empty"
import { Folder } from "lucide-react"
import ProjectCard from "./ProjectCard"

const AdminPageCards = () => {
  const { data, isPending } = useQuery(
    createProjectsQueryOptions({ staleTime: 1000 * 60 * 5 })
  )

  if (data?.length === 0) {
    return (
      <Empty className="m-0 p-0">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder />
          </EmptyMedia>
          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription>No data found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Add data</Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
      {data?.map((project) => (
        <ProjectCard data={project} key={project.id} />
      ))}
    </div>
  )
}

export default AdminPageCards
