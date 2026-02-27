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
import { SquarePen } from "lucide-react"
import { toast } from "sonner"
import { updateBioApi } from "@/lib/api-calls/bio"
import { bioData, updateBioDataDto } from "@/types/bioData"
import { EditHeroFormSchema } from "../lib/zod/EditHeroSchema"
import { useMutation } from "@tanstack/react-query"
import { useAppForm } from "@/features/TanstackForm/hooks"

interface EditHeroSheetProps {
  data: bioData
}

export function EditHeroSheet({ data }: EditHeroSheetProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, updatedData }: updateBioDataDto) =>
      updateBioApi({ id, updatedData }),
    onSuccess: () => {
      toast("Hero Set up Successfully")
    },
  })

  const form = useAppForm({
    defaultValues: {
      name: data.name,
      name_subtext: data.name_subtext,
      hero_description: data.hero_description,
      email: data.email,
      instagram_url: data.instagram_url,
      linked_in_url: data.linked_in_url,
      github_url: data.github_url,
    },
    validators: {
      onChange: EditHeroFormSchema,
    },
    onSubmit: async ({ value }) => {
      await mutate({ id: data.id, updatedData: value })
    },
  })
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet>
        <form
          id="bio-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <SheetTrigger asChild>
            <Button variant="ghost" className="capitalize font-sans">
              EDIT <SquarePen />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={"right"}
            className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
          >
            <SheetHeader>
              <SheetTitle>Edit Bio</SheetTitle>
              <SheetDescription>
                Make changes to your Bio here. Click save when you&apos;re done.
                You cannot change the profile picture or edit the work, skills
                and education data here.
              </SheetDescription>
            </SheetHeader>
            <div className="no-scrollbar overflow-y-auto p-4">
              <FieldGroup>
                <form.AppField name="name">
                  {(field) => <field.Input label="Name" />}
                </form.AppField>

                <form.AppField name="name_subtext">
                  {(field) => <field.Input label="Sub Text" />}
                </form.AppField>

                <form.AppField name="hero_description">
                  {(field) => (
                    <field.InputGroupTextArea label="Hero Description" />
                  )}
                </form.AppField>
                <form.AppField name="email">
                  {(field) => <field.Input label="Email" />}
                </form.AppField>

                <form.AppField name="github_url">
                  {(field) => <field.Input label="GitHub URL" />}
                </form.AppField>

                <form.AppField name="linked_in_url">
                  {(field) => <field.Input label="LinkedIn URL" />}
                </form.AppField>

                <form.AppField name="instagram_url">
                  {(field) => <field.Input label="Instagram URL" />}
                </form.AppField>
              </FieldGroup>
            </div>
            <SheetFooter>
              <div className="flex justify-between gap-2">
                <div className="w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    className="w-full"
                  >
                    Reset
                  </Button>
                </div>
                <div className="w-full">
                  <Button
                    variant="outline"
                    type="submit"
                    form="bio-form"
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>

              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </form>
      </Sheet>
    </div>
  )
}
