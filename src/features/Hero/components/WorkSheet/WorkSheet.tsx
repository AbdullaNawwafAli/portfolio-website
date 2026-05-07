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
import { useState } from "react"

interface WorkSheetProps {
  displayMode: boolean
}

const WorkSheet = ({ displayMode }: WorkSheetProps) => {
  const [addNewEntry, setAddNewEntry] = useState(false)
  const { data, isPending } = useQuery(createWorkQueryOptions())
  const isDataThere = data ? data.length > 0 || addNewEntry : false

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"}>
          Work <ChevronRight />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh] w-1/3  sm:max-w-none"
      >
        <SheetHeader>
          <SheetTitle>Work</SheetTitle>
        </SheetHeader>
        <div className="no-scrollbar  p-4 flex flex-col gap-2 h-full overflow-hidden overflow-y-auto">
          {isDataThere ? (
            data?.map((work) => (
              <WorkCard
                data={work}
                key={work.company_name}
                deleteAllowed={!displayMode}
              />
            ))
          ) : (
            <div>You currently have no work experience added</div>
          )}
          {addNewEntry && (
            <WorkCard formMode={true} onSaved={() => setAddNewEntry(false)} />
          )}
        </div>
        <SheetFooter>
          {addNewEntry ? (
            <>
              <Button variant="outline" type="submit" form="work-form">
                Save
              </Button>
              <Button variant="outline" onClick={() => setAddNewEntry(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              {!displayMode && (
                <Button variant="outline" onClick={() => setAddNewEntry(true)}>
                  New Entry
                </Button>
              )}

              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default WorkSheet
