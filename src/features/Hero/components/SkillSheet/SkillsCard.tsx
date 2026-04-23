import { useAppForm } from "@/features/TanstackForm/hooks"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/card"
import { createWorkSchema } from "../../lib/zod/createWorkSchema"
import {
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/ui/shadcn/field"
import { toast } from "sonner"
import { Button } from "@/ui/shadcn/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { Trash } from "lucide-react"
import { createSkillsSchema } from "../../lib/zod/createSkillsSchema"
import {
  createSkillsDataDto,
  deleteSkillsDataDto,
  Skill,
  SkillsData,
} from "@/types/skills"
import { createSkillsApi, deleteSkillsApi } from "@/lib/api-calls/skills"

interface SkillsCardProps {
  data?: SkillsData
  formMode?: boolean
  deleteAllowed?: boolean
  onSaved?: () => void
}
const SkillsCard = ({
  data,
  formMode,
  deleteAllowed,
  onSaved,
}: SkillsCardProps) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (value: createSkillsDataDto) => createSkillsApi(value),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["skills"] })
      onSaved?.()
      toast("Education entry created successfully")
    },
  })

  const deleteRecord = async () => {
    await deleteSkillsApi({ id: data?.id } as deleteSkillsDataDto)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["skills"] })
        toast("Skills entry deleted successfully")
      })
      .catch(() => {
        toast.error("Failed to delete Skills entry")
      })
  }

  const form = useAppForm({
    defaultValues: {
      skill_type_name: "",
      skills: [] as Omit<Skill, "id" | "skill_type_id">[],
    },
    validators: {
      onSubmit: createSkillsSchema,
    },
    onSubmit: async ({ value }) => {
      await mutate(value as createSkillsDataDto)
    },
  })

  //Form mode when creating a new work entry
  if (formMode) {
    return (
      <Card>
        <form
          id="skills-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <CardContent>
            <FieldGroup>
              <form.AppField name="skill_type_name">
                {(field) => <field.Input label="Skill Type" />}
              </form.AppField>

              <form.Field name="skills" mode="array">
                {(field) => (
                  <FieldSet>
                    <div className="flex justify-between gap-2 items-center">
                      <FieldContent>
                        <FieldLegend variant="label" className="mb-0">
                          Skills
                        </FieldLegend>
                        <FieldDescription>
                          Add skills under this type.
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
                            skill_name: "",
                            skill_logo_cloudinary_id: "",
                          })
                        }
                      >
                        Add Skill
                      </Button>
                    </div>
                    <FieldGroup>
                      {(field.state.value ?? []).map((_, index) => (
                        <FieldSet key={index}>
                          <form.AppField name={`skills[${index}].skill_name`}>
                            {(innerField) => (
                              <innerField.Input label="Skill Name" />
                            )}
                          </form.AppField>
                          <form.AppField
                            name={`skills[${index}].skill_logo_cloudinary_id`}
                          >
                            {(innerField) => (
                              <innerField.Input label="Logo Cloudinary ID" />
                            )}
                          </form.AppField>
                        </FieldSet>
                      ))}
                    </FieldGroup>
                  </FieldSet>
                )}
              </form.Field>
            </FieldGroup>
          </CardContent>
        </form>
      </Card>
    )
  }

  //default work card
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent></CardContent>
      {deleteAllowed ? (
        <CardFooter>
          <Button
            variant="destructive"
            className="w-full"
            onClick={deleteRecord}
          >
            <Trash />
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}

export default SkillsCard
