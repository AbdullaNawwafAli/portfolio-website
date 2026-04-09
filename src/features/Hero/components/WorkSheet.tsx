"use client"
import createWorkQueryOptions from "@/lib/tanstack-queries/createWorkQueryOptions"
import { Button } from "@/ui/shadcn/button"
import { FieldGroup } from "@/ui/shadcn/field"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/shadcn/sheet"
import { useQuery } from "@tanstack/react-query"
import { ChevronRight } from "lucide-react"
import WorkCard from "./WorkCard"

const WorkSheet = () => {
  const { data, isPending } = useQuery(createWorkQueryOptions())

  return (
    <div className="flex flex-wrap gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
            Work <ChevronRight />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
        >
          <SheetHeader>
            <SheetTitle>Work</SheetTitle>
          </SheetHeader>
          <div className="no-scrollbar  p-4">
            {data?.map((work) => (
              <WorkCard data={work} />
            ))}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default WorkSheet
