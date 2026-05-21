"use client"

import { projectMediaDraftSchema } from "@/features/Projects/features/ProjectCreateForm/schemas/createProjectSchema"
import { ProjectMediaType } from "@/features/Projects/types/projectData"
import { Button } from "@/ui/shadcn/button"
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/ui/shadcn/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/ui/shadcn/item"
import { Input } from "@/ui/shadcn/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/ui/shadcn/popover"
import { Film, ImageIcon, Plus, Trash, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

type ProjectMediaDraft = {
  file: File
  type: ProjectMediaType
  description: string
  alt: string
}

export type ProjectMediaFormItem = ProjectMediaDraft & {
  order: number
}

interface ProjectMediaFieldProps {
  items: ProjectMediaFormItem[]
  onAdd: (item: ProjectMediaFormItem) => void
  onRemove: (index: number) => void
  fieldErrors?: Array<{ message?: string } | undefined>
}

const emptyDraft = (): ProjectMediaDraft => ({
  file: new File([], ""),
  type: "img",
  description: "",
  alt: "",
})

const ProjectMediaField = ({
  items,
  onAdd,
  onRemove,
  fieldErrors,
}: ProjectMediaFieldProps) => {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<ProjectMediaDraft>(emptyDraft)
  const [draftErrors, setDraftErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetDraft = () => {
    setDraft(emptyDraft())
    setDraftErrors({})
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleAdd = () => {
    const result = projectMediaDraftSchema.safeParse(draft)

    if (!result.success) {
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? "form")
        errors[key] = issue.message
      }
      setDraftErrors(errors)
      return
    }

    onAdd({ ...result.data, order: items.length })
    resetDraft()
    setOpen(false)
    toast("Media added")
  }

  return (
    <FieldSet>
      <div className="flex justify-between gap-2 items-center">
        <FieldContent>
          <FieldLegend variant="label" className="mb-0">
            Media
          </FieldLegend>
          <FieldDescription>
            Add images or videos for this project.
          </FieldDescription>
          {fieldErrors && <FieldError errors={fieldErrors} />}
        </FieldContent>

        <Popover
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen)
            if (!nextOpen) resetDraft()
          }}
        >
          <PopoverTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <Plus className="size-4" />
              Add Media
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <PopoverHeader>
              <PopoverTitle>Add media</PopoverTitle>
              <PopoverDescription>
                Upload a file and fill in the details.
              </PopoverDescription>
            </PopoverHeader>

            <FieldGroup className="mt-3">
              <Field data-invalid={!!draftErrors.file}>
                <FieldContent>
                  <FieldLabel htmlFor="media-file">Media file</FieldLabel>
                </FieldContent>
                <InputGroup>
                  <InputGroupInput
                    id="media-file"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setDraft((prev) => ({ ...prev, file }))
                    }}
                  />
                  {draft.file.size > 0 && (
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setDraft((prev) => ({
                            ...prev,
                            file: new File([], ""),
                          }))
                          if (fileInputRef.current)
                            fileInputRef.current.value = ""
                        }}
                      >
                        <X className="size-4" />
                      </InputGroupButton>
                    </InputGroupAddon>
                  )}
                </InputGroup>
                {draftErrors.file && (
                  <FieldError errors={[{ message: draftErrors.file }]} />
                )}
              </Field>

              <Field>
                <FieldContent>
                  <FieldLabel>Media type</FieldLabel>
                </FieldContent>
                <div className="flex gap-2">
                  {(["img", "vid"] as const).map((type) => (
                    <Button
                      key={type}
                      type="button"
                      size="sm"
                      variant={draft.type === type ? "default" : "outline"}
                      className="flex-1 capitalize"
                      onClick={() => setDraft((prev) => ({ ...prev, type }))}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </Field>

              <Field data-invalid={!!draftErrors.alt}>
                <FieldContent>
                  <FieldLabel htmlFor="media-alt">Alt text</FieldLabel>
                </FieldContent>
                <Input
                  id="media-alt"
                  value={draft.alt}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, alt: e.target.value }))
                  }
                  autoComplete="off"
                />
                {draftErrors.alt && (
                  <FieldError errors={[{ message: draftErrors.alt }]} />
                )}
              </Field>

              <Field data-invalid={!!draftErrors.description}>
                <FieldContent>
                  <FieldLabel htmlFor="media-description">
                    Description
                  </FieldLabel>
                </FieldContent>
                <Input
                  id="media-description"
                  value={draft.description}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  autoComplete="off"
                />
                {draftErrors.description && (
                  <FieldError errors={[{ message: draftErrors.description }]} />
                )}
              </Field>

              <Button
                type="button"
                className="w-full capitalize font-sans"
                onClick={handleAdd}
              >
                Add to project
              </Button>
            </FieldGroup>
          </PopoverContent>
        </Popover>
      </div>

      {items.length > 0 && (
        <ItemGroup className="mt-2">
          {items.map((item, index) => (
            <MediaListItem
              key={`${item.alt}-${item.order}-${index}`}
              item={item}
              onDelete={() => onRemove(index)}
              showSeparator={index < items.length - 1}
            />
          ))}
        </ItemGroup>
      )}
    </FieldSet>
  )
}

function MediaListItem({
  item,
  onDelete,
  showSeparator,
}: {
  item: ProjectMediaFormItem
  onDelete: () => void
  showSeparator: boolean
}) {
  const [thumbUrl, setThumbUrl] = useState<string | null>(null)

  useEffect(() => {
    if (item.type !== "img" || !item.file.size) {
      setThumbUrl(null)
      return
    }

    const url = URL.createObjectURL(item.file)
    setThumbUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [item.file, item.type])

  return (
    <>
      <Item variant="outline" size="sm">
        <ItemMedia variant={item.type === "img" && thumbUrl ? "image" : "icon"}>
          {item.type === "img" && thumbUrl ? (
            <Image
              src={thumbUrl}
              alt={item.alt}
              width={40}
              height={40}
              unoptimized
            />
          ) : item.type === "vid" ? (
            <Film className="size-4 text-muted-foreground" />
          ) : (
            <ImageIcon className="size-4 text-muted-foreground" />
          )}
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{item.alt}</ItemTitle>
          <ItemDescription>{item.description}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={onDelete}
            aria-label={`Delete ${item.alt}`}
          >
            <Trash className="size-4" />
          </Button>
        </ItemActions>
      </Item>
      {showSeparator && <ItemSeparator />}
    </>
  )
}

export default ProjectMediaField
