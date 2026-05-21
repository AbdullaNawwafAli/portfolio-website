"use client"
import { Button } from "@/ui/shadcn/button"
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
import { useState } from "react"
import EducationCard from "./EducationCard"
import createEducationQueryOptions from "@/features/Hero/features/EducationSheet/hooks/createEducationQueryOptions"

interface EducationSheetProps {
  displayMode?: boolean
}

const EducationSheet = ({ displayMode }: EducationSheetProps) => {
  const [addNewEntry, setAddNewEntry] = useState(false)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const { data, isPending } = useQuery(
    createEducationQueryOptions({ staleTime: 1000 * 60 * 5 })
  )
  const isDataThere = data ? data.length > 0 || addNewEntry : false

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"}>
          Education <ChevronRight />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh] w-1/3  sm:max-w-none"
      >
        <SheetHeader>
          <SheetTitle>Education</SheetTitle>
        </SheetHeader>
        <div className="no-scrollbar  p-4 flex flex-col gap-2 h-full overflow-hidden overflow-y-auto">
          {isDataThere ? (
            data?.map((education) => (
              <EducationCard
                data={education}
                key={education.institute}
                deleteAllowed={!displayMode}
              />
            ))
          ) : (
            <div>You currently have no education added</div>
          )}
          {addNewEntry && (
            <EducationCard
              formMode={true}
              isAddingNewEntry={setAddNewEntry}
              setIsFormSubmitting={setIsFormSubmitting}
            />
          )}
        </div>
        <SheetFooter>
          {addNewEntry ? (
            <>
              <Button
                variant="outline"
                type="submit"
                form="education-form"
                disabled={isFormSubmitting}
              >
                {isFormSubmitting ? "Saving..." : "Save"}
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

export default EducationSheet
