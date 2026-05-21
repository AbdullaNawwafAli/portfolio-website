"use client"

import { projectTagSchema } from "@/features/Projects/features/ProjectCreateForm/schemas/createProjectSchema"
import { Badge } from "@/ui/shadcn/badge"
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
import { Input } from "@/ui/shadcn/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/ui/shadcn/popover"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ProjectTagsFieldProps {
  tags: string[]
  onAdd: (tag: string) => void
  onRemove: (index: number) => void
  fieldErrors?: Array<{ message?: string } | undefined>
}

const ProjectTagsField = ({
  tags,
  onAdd,
  onRemove,
  fieldErrors,
}: ProjectTagsFieldProps) => {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState("")
  const [draftError, setDraftError] = useState<string | null>(null)

  const resetDraft = () => {
    setDraft("")
    setDraftError(null)
  }

  const handleAdd = () => {
    const result = projectTagSchema.safeParse(draft)

    if (!result.success) {
      setDraftError(result.error.issues[0]?.message ?? "Invalid tag")
      return
    }

    const normalized = result.data
    const isDuplicate = tags.some(
      (tag) => tag.toLowerCase() === normalized.toLowerCase()
    )

    if (isDuplicate) {
      setDraftError("Tag already added")
      return
    }

    onAdd(normalized)
    resetDraft()
    setOpen(false)
    toast("Tag added")
  }

  return (
    <FieldSet>
      <div className="flex justify-between gap-2 items-center">
        <FieldContent>
          <FieldLegend variant="label" className="mb-0">
            Tags
          </FieldLegend>
          <FieldDescription>
            Add tags to categorize this project.
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
              Add Tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="end">
            <PopoverHeader>
              <PopoverTitle>Add tag</PopoverTitle>
              <PopoverDescription>
                Enter a label for this project.
              </PopoverDescription>
            </PopoverHeader>

            <FieldGroup className="mt-3">
              <Field data-invalid={!!draftError}>
                <FieldContent>
                  <FieldLabel htmlFor="tag-input">Tag</FieldLabel>
                </FieldContent>
                <Input
                  id="tag-input"
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value)
                    setDraftError(null)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAdd()
                    }
                  }}
                  placeholder="e.g. React"
                  autoComplete="off"
                />
                {draftError && (
                  <FieldError errors={[{ message: draftError }]} />
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

      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={`${tag}-${index}`}
              variant="secondary"
              className="gap-1 pr-1 font-sans"
            >
              {tag}
              <button
                type="button"
                className="rounded-full p-0.5 hover:bg-muted-foreground/20"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${tag}`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </FieldSet>
  )
}

export default ProjectTagsField
