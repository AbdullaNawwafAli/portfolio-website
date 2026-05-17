"use client"

import { useAppForm } from "@/features/TanstackForm/hooks"
import { createProjectSchema } from "@/features/Projects/lib/zod/createProjectSchema"
import { createProjectApi } from "@/lib/api-calls/projects"
import { uploadFileToCloudinaryApi } from "@/lib/api-calls/cloudinary"
import { convertToBase64 } from "@/lib/utils/fileUtils"
import {
  createProjectDataDto,
  ProjectMediaDto,
  ProjectMediaType,
} from "@/types/projectData"
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
  FieldLegend,
  FieldSet,
} from "@/ui/shadcn/field"
import { Input } from "@/ui/shadcn/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const NewProjectForm = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (value: createProjectDataDto) => createProjectApi(value),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast("Project created successfully")
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
                        Show this project prominently on the portfolio.
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
                <FieldSet>
                  <div className="flex justify-between gap-2 items-center">
                    <FieldContent>
                      <FieldLegend variant="label" className="mb-0">
                        Tags
                      </FieldLegend>
                      <FieldDescription>
                        Add tags to categorize this project.
                      </FieldDescription>
                      {field.state.meta.errors && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue("")}
                    >
                      Add Tag
                    </Button>
                  </div>
                  <FieldGroup>
                    {(field.state.value ?? []).map((_, index) => (
                      <form.AppField key={index} name={`tags[${index}]`}>
                        {(innerField) => <innerField.Input label="Tag" />}
                      </form.AppField>
                    ))}
                  </FieldGroup>
                </FieldSet>
              )}
            </form.Field>

            <form.Field name="media" mode="array">
              {(field) => (
                <FieldSet>
                  <div className="flex justify-between gap-2 items-center">
                    <FieldContent>
                      <FieldLegend variant="label" className="mb-0">
                        Media
                      </FieldLegend>
                      <FieldDescription>
                        Add images or videos for this project.
                      </FieldDescription>
                      {field.state.meta.errors && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        field.pushValue({
                          file: new File([], ""),
                          type: "img" as const,
                          description: "",
                          alt: "",
                          order: field.state.value?.length ?? 0,
                        })
                      }
                    >
                      Add Media
                    </Button>
                  </div>
                  <FieldGroup>
                    {(field.state.value ?? []).map((_, index) => (
                      <FieldSet key={index}>
                        <form.AppField name={`media[${index}].file`}>
                          {(innerField) => (
                            <innerField.FileInput label="Media File" />
                          )}
                        </form.AppField>
                        <form.AppField name={`media[${index}].type`}>
                          {(innerField) => (
                            <innerField.Input
                              label="Media Type"
                              description='Use "img" or "vid"'
                            />
                          )}
                        </form.AppField>
                        <form.AppField name={`media[${index}].description`}>
                          {(innerField) => (
                            <innerField.Input label="Media Description" />
                          )}
                        </form.AppField>
                        <form.AppField name={`media[${index}].alt`}>
                          {(innerField) => (
                            <innerField.Input label="Alt Text" />
                          )}
                        </form.AppField>
                        <form.AppField name={`media[${index}].order`}>
                          {(innerField) => {
                            const isInvalid =
                              innerField.state.meta.isTouched &&
                              !innerField.state.meta.isValid

                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldContent>
                                  <FieldLabel htmlFor={innerField.name}>
                                    Media Order
                                  </FieldLabel>
                                </FieldContent>
                                <Input
                                  id={innerField.name}
                                  name={innerField.name}
                                  type="number"
                                  value={innerField.state.value}
                                  onBlur={innerField.handleBlur}
                                  onChange={(e) =>
                                    innerField.handleChange(
                                      Number(e.target.value) || 0
                                    )
                                  }
                                  aria-invalid={isInvalid}
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError
                                    errors={innerField.state.meta.errors}
                                  />
                                )}
                              </Field>
                            )
                          }}
                        </form.AppField>
                      </FieldSet>
                    ))}
                  </FieldGroup>
                </FieldSet>
              )}
            </form.Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end">
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
            className="capitalize font-sans"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Project"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default NewProjectForm
