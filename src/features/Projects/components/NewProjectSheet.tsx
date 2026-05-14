"use client"
import { Button } from "@/ui/shadcn/button"
import { FieldGroup } from "@/ui/shadcn/field"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/shadcn/sheet"
import { toast } from "sonner"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useAppForm } from "../../TanstackForm/hooks"
import { convertToBase64 } from "@/lib/utils/fileUtils"
import { uploadFileToCloudinaryApi } from "@/lib/api-calls/cloudinary"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function NewProjectSheet() {
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* <form
          id="new-project-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        > */}
      <SheetTrigger asChild>
        <Button className="capitalize font-sans">New Project</Button>
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="data-[side=bottom]:max-h-[50vh]  data-[side=top]:max-h-[50vh] w-full sm:max-w-none"
      >
        <SheetHeader>
          <SheetTitle>Create Project</SheetTitle>
          <SheetDescription>
            Make changes to your Bio here. Click save when you&apos;re done. You
            cannot change the profile picture or edit the work, skills and
            education data here.
          </SheetDescription>
        </SheetHeader>
        <div className="no-scrollbar overflow-y-auto p-4">
          <FieldGroup></FieldGroup>
        </div>
        <SheetFooter>
          <div className="flex justify-between gap-2">
            <div className="w-full">
              <Button type="button" variant="outline" className="w-full">
                Reset
              </Button>
            </div>
            <div className="w-full">
              {/*disabled = {isPending} */}
              <Button
                variant="outline"
                type="submit"
                form="new-project-form"
                className="w-full"
                disabled={false}
              >
                {false ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
      {/* </form> */}
    </Sheet>
  )
}
