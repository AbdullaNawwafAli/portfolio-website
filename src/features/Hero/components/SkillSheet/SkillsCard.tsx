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

interface SkillsCardProps {
  data?: EducationData
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
    mutationFn: (value: createEducationDataDto) => createEducationApi(value),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["education"] })
      onSaved?.()
      toast("Education entry created successfully")
    },
  })

  const deleteRecord = async () => {
    await deleteEducationApi({ id: data?.id } as deleteEducationDataDto)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["work"] })
        toast("Education entry deleted successfully")
      })
      .catch(() => {
        toast.error("Failed to delete education entry")
      })
  }

  const form = useAppForm({
    defaultValues: {
      institute: "",
      country: "",
      startDate: undefined as Date | undefined,
      finishDate: undefined as Date | undefined,
    },
    validators: {
      onSubmit: createSkillsSchema,
    },
    onSubmit: async ({ value }) => {
      await mutate(value as createEducationDataDto)
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

              <form.Field name="responsibilities" mode="array">
                {(field) => {
                  return (
                    <FieldSet>
                      <div className="flex justify-between gap-2 items-center">
                        <FieldContent>
                          <FieldLegend variant="label" className="mb-0">
                            Skills
                          </FieldLegend>
                          <FieldDescription>
                            Add the skill you had in this type.
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
                          Add Responsibility
                        </Button>
                      </div>
                      <FieldGroup>
                        {(field.state.value ?? []).map((_, index) => (
                          <form.AppField
                            key={index}
                            name={`responsibilities[${index}]`}
                          >
                            {(innerField) => (
                              <innerField.InputGroupTextArea label="Responsibility" />
                            )}
                          </form.AppField>
                        ))}
                      </FieldGroup>
                    </FieldSet>
                  )
                }}
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
        <CardTitle>{data?.institute}</CardTitle>
        <CardDescription>
          {(data?.startDate
            ? format(new Date(data.startDate), "dd MMM yyyy")
            : undefined) +
            " - " +
            (data?.finishDate
              ? format(new Date(data?.finishDate), "dd MMM yyyy")
              : "present")}
        </CardDescription>
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
