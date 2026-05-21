"use client"

import { useAppForm } from "@/features/TanstackForm/hooks/hooks"
import { createProjectSchema } from "@/features/Projects/features/ProjectCreateForm/schemas/createProjectSchema"
import { createProjectApi } from "../../../services/projects"
import { uploadFileToCloudinaryApi } from "../../../../../services/cloudinary"
import { convertToBase64 } from "@/utils/fileUtils"
import {
  createProjectDataDto,
  ProjectMediaDto,
  ProjectMediaType,
} from "@/features/Projects/types/projectData"
import { Button } from "@/ui/shadcn/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/ui/shadcn/field"
import { Input } from "@/ui/shadcn/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import ProjectMediaField from "./ProjectMediaField"
import ProjectTagsField from "./ProjectTagsField"
import { useState } from "react"

const NewProjectForm = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (value: createProjectDataDto) => createProjectApi(value),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast("Project created successfully")
      setIsFormSubmitting(false)
      router.push("/admin-projects")
    },
    onError: () => {
      toast.error("Failed to create project")
    },
  })

  const form = useAppForm({
    defaultValues: {
      name: "",
      description: "",
      startDate: undefined as Date | undefined,
      finishDate: undefined as Date | undefined,
      order: 0,
      featured: false,
      media: [] as {
        file: File
        type: "img" | "vid"
        description: string
        alt: string
        order: number
      }[],
      tags: [] as string[],
    },
    validators: {
      onSubmit: createProjectSchema,
    },
    onSubmit: async ({ value }) => {
      let media: ProjectMediaDto[] | undefined

      const validMedia = value.media?.filter((item) => item.file.size > 0)

      setIsFormSubmitting(true)

      if (validMedia?.length) {
        media = await Promise.all(
          validMedia.map(async (item) => {
            const base64 = await convertToBase64(item.file)
            const { publicId } = await uploadFileToCloudinaryApi(base64, {
              folder: "nextjs_uploads",
              resource_type: item.type === "vid" ? "video" : "image",
            })

            return {
              cloudinaryId: publicId,
              type: item.type as ProjectMediaType,
              description: item.description,
              alt: item.alt,
              order: item.order,
            }
          })
        )
      }

      await mutateAsync({
        name: value.name,
        description: value.description,
        startDate: value.startDate as Date,
        finishDate: value.finishDate as Date,
        order: value.order,
        featured: value.featured,
        media,
        tags: value.tags?.filter((tag) => tag.trim().length > 0),
      })
    },
  })

  return (
    <Card className="w-full max-w-none h-full max-h-none">
      <form
        id="new-project-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <CardHeader>
          <CardTitle className="font-sans">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <FieldGroup>
            <form.AppField name="name">
              {(field) => <field.Input label="Project Name" />}
            </form.AppField>

            <form.AppField name="description">
              {(field) => <field.InputGroupTextArea label="Description" />}
            </form.AppField>

            <form.AppField name="startDate">
              {(field) => <field.DatePicker label="Start Date" />}
            </form.AppField>

            <form.AppField name="finishDate">
              {(field) => <field.DatePicker label="Finish Date" />}
            </form.AppField>

            <form.AppField name="order">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="order">Display Order</FieldLabel>
                    </FieldContent>
                    <Input
                      id="order"
                      name="order"
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value) || 0)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.AppField>

            <form.AppField name="featured">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldLabel htmlFor="featured">Featured</FieldLabel>
                      <FieldDescription>
                        Featured projects are displayed on the home page.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Input
                      id="featured"
                      type="checkbox"
                      className="size-4"
                      checked={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      aria-invalid={isInvalid}
                    />
                  </Field>
                )
              }}
            </form.AppField>

            <form.Field name="tags" mode="array">
              {(field) => (
                <ProjectTagsField
                  tags={field.state.value ?? []}
                  onAdd={(tag) => field.pushValue(tag)}
                  onRemove={(index) => field.removeValue(index)}
                  fieldErrors={field.state.meta.errors}
                />
              )}
            </form.Field>

            <form.Field name="media" mode="array">
              {(field) => (
                <ProjectMediaField
                  items={field.state.value ?? []}
                  onAdd={(item) => field.pushValue(item)}
                  onRemove={(index) => {
                    const next = (field.state.value ?? [])
                      .filter((_, i) => i !== index)
                      .map((mediaItem, i) => ({ ...mediaItem, order: i }))
                    field.setValue(next)
                  }}
                  fieldErrors={field.state.meta.errors}
                />
              )}
            </form.Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end pt-10">
          <Link href="/admin-projects">
            <Button
              variant="outline"
              type="button"
              className="capitalize font-sans"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            id="new-project-form"
            className="capitalize font-sans"
            disabled={isFormSubmitting}
          >
            {isFormSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default NewProjectForm
