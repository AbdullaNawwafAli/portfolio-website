"use client"
import { Button } from "@/ui/shadcn/button"
import { FieldGroup, Field, FieldLabel, FieldError } from "@/ui/shadcn/field"
import { Input } from "@/ui/shadcn/input"
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
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
} from "@/ui/shadcn/input-group"
import { updateBioApi } from "@/lib/api-calls/bio"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useAppForm } from "../TanstackForm/hooks"

const formSchema = z.object({
  hero_photo: z.instanceof(File),
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
    .max(200, "Hero description must be at most 100 characters."),
  email: z.email(),
  instagram_url: z
    .string()
    .min(1, "Instagram URL must be at least 1 character."),
  linked_in_url: z
    .string()
    .min(1, "LinkedIn URL must be at least 1 character."),
  github_url: z.string().min(1, "GitHub URL must be at least 1 character."),
  resume_pdf_cloudinary_id: z
    .string()
    .min(1, "Resume PDF Cloudinary ID must be at least 1 character."),
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
      resume_pdf_cloudinary_id: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const res = updateBioApi({ id: "", updatedData: value })
      console.log(res)
    },
  })

  const [preview, setPreview] = useState<string | null>(null)
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

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
                    width={500}
                    height={500}
                  />
                )}
                <form.Field name="hero_photo">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Hero Photo</FieldLabel>
                        <Input
                          id={field.name}
                          type={"file"}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            field.handleChange(file)

                            // Clean up previous object URL to avoid memory leaks
                            if (preview) URL.revokeObjectURL(preview)
                            setPreview(file ? URL.createObjectURL(file) : null)
                          }}
                          aria-invalid={isInvalid}
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>
                <form.AppField name="name">
                  {(field) => <field.Input label="Name" />}
                </form.AppField>

                <form.AppField name="name_subtext">
                  {(field) => <field.Input label="Sub Text" />}
                </form.AppField>

                <form.Field name="hero_description">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Hero Description
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Description"
                            rows={6}
                            className="min-h-24 resize-none"
                            aria-invalid={isInvalid}
                          />
                          <InputGroupAddon align="block-end">
                            <InputGroupText className="tabular-nums">
                              {field.state.value.length}/100 characters
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>
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

                <form.AppField name="resume_pdf_cloudinary_id">
                  {(field) => <field.Input label="Resume PDF Cloudinary ID" />}
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
