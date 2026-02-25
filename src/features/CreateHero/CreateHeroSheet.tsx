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
import * as z from "zod"
import { createBioApi, updateBioApi } from "@/lib/api-calls/bio"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useAppForm } from "../TanstackForm/hooks"
import { convertToBase64 } from "@/lib/utils/fileUtils"
import { uploadFileToCloudinaryApi } from "@/lib/api-calls/cloudinary"
import { createBioDataDto } from "@/types/bioData"

const formSchema = z.object({
  hero_photo: z.instanceof(File, {
    message: "Hero photo is required",
  }),
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
  name_subtext: z
    .string()
    .min(5, "Name subtext must be at least 5 characters.")
    .max(32, "Name subtext must be at most 32 characters."),
  hero_description: z
    .string()
    .min(20, "Hero description must be at least 20 characters.")
    .max(200, "Hero description must be at most 200 characters."),
  email: z.email(),
  instagram_url: z
    .string()
    .min(1, "Instagram URL must be at least 1 character."),
  linked_in_url: z
    .string()
    .min(1, "LinkedIn URL must be at least 1 character."),
  github_url: z.string().min(1, "GitHub URL must be at least 1 character."),
  resume_pdf: z.instanceof(File, {
    message: "Resume is required",
  }),
})

export function CreateHeroSheet() {
  const form = useAppForm({
    defaultValues: {
      hero_photo: undefined as File | undefined,
      name: "",
      name_subtext: "",
      hero_description: "",
      email: "",
      instagram_url: "",
      linked_in_url: "",
      github_url: "",
      resume_pdf: undefined as File | undefined,
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      // const res = updateBioApi({ id: "", updatedData: value })
      if (value.hero_photo && value.resume_pdf) {
        const heroPicBase64 = await convertToBase64(value.hero_photo)
        const resumePdfBase64 = await convertToBase64(value.resume_pdf)
        const [{ publicId: heroPicPublicId }, { publicId: resumePdfPublicId }] =
          await Promise.all([
            uploadFileToCloudinaryApi(heroPicBase64),
            uploadFileToCloudinaryApi(resumePdfBase64),
          ])
        let createBioData: createBioDataDto = {
          name: value.name,
          name_subtext: value.name_subtext,
          hero_description: value.hero_description,
          email: value.email,
          bio_picture_cloudinary_id: heroPicPublicId,
          resume_pdf_cloudinary_id: resumePdfPublicId,
          instagram_url: value.instagram_url,
          linked_in_url: value.linked_in_url,
          github_url: value.github_url,
        }

        const res = await createBioApi(createBioData)
        console.log(res)
      }
    },
  })

  const [preview, setPreview] = useState<string | null>(null)
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
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
            <Button className="capitalize font-sans">Set Up Hero</Button>
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
                {preview && (
                  <Image
                    src={preview}
                    alt="Hero photo preview"
                    width={400}
                    height={400}
                  />
                )}

                <form.AppField
                  name="hero_photo"
                  validators={{
                    onChange: ({ value }) => {
                      if (value) {
                        if (preview) URL.revokeObjectURL(preview)
                        const objectUrl = URL.createObjectURL(value)
                        setPreview(objectUrl)
                      } else {
                        if (preview) URL.revokeObjectURL(preview)
                        setPreview(null)
                      }
                    },
                  }}
                >
                  {(field) => <field.FileInput label="Hero Photo" />}
                </form.AppField>
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

                <form.AppField name="resume_pdf">
                  {(field) => <field.FileInput label="Resume PDF" />}
                </form.AppField>
              </FieldGroup>
            </div>
            <SheetFooter>
              <div className="flex justify-between gap-2">
                <div className="w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset()
                      if (preview) URL.revokeObjectURL(preview)
                      setPreview(null)
                    }}
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
                  >
                    Submit
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
