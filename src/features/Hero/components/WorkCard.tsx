import { useAppForm } from "@/features/TanstackForm/hooks"
import { createWorkDataDto, WorkData } from "@/types/workData"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/card"
import { createWorkSchema } from "../lib/zod/createWorkSchema"
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
import { createWorkApi } from "@/lib/api-calls/work"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"

interface WorkCardProps {
  data?: WorkData
  formMode?: boolean
  onSaved?: () => void
}
const WorkCard = ({ data, formMode, onSaved }: WorkCardProps) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (value: createWorkDataDto) => createWorkApi(value),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["work"] })
      onSaved?.()
      toast("Work entry created successfully")
    },
  })

  const form = useAppForm({
    defaultValues: {
      company_name: "",
      job_title: "",
      country: "",
      city: "",
      startDate: undefined as Date | undefined,
      finishDate: undefined as Date | undefined,
      responsibilities: undefined as string[] | undefined,
    },
    validators: {
      onSubmit: createWorkSchema,
    },
    onSubmit: async ({ value }) => {
      await mutate(value as createWorkDataDto)
    },
  })

  if (formMode) {
    return (
      <Card>
        <form
          id="work-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <CardContent>
            <FieldGroup>
              <form.AppField name="company_name">
                {(field) => <field.Input label="Company Name" />}
              </form.AppField>
              <form.AppField name="job_title">
                {(field) => <field.Input label="Job Title" />}
              </form.AppField>
              <form.AppField name="country">
                {(field) => <field.Input label="Country" />}
              </form.AppField>
              <form.AppField name="city">
                {(field) => <field.Input label="City" />}
              </form.AppField>

              <form.AppField name="startDate">
                {(field) => <field.DatePicker label="Start Date" />}
              </form.AppField>
              <form.AppField name="finishDate">
                {(field) => <field.DatePicker label="Finish Date" />}
              </form.AppField>

              <form.Field name="responsibilities" mode="array">
                {(field) => {
                  return (
                    <FieldSet>
                      <div className="flex justify-between gap-2 items-center">
                        <FieldContent>
                          <FieldLegend variant="label" className="mb-0">
                            Responsibilities
                          </FieldLegend>
                          <FieldDescription>
                            Add the responsibilities you had in this role.
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data?.company_name}</CardTitle>
        <CardDescription></CardDescription>
        <CardDescription>
          {(data?.startDate
            ? format(new Date(data.startDate), "dd MMM yyyy")
            : undefined) +
            " - " +
            (data?.finishDate
              ? format(new Date(data?.finishDate), "dd MMM yyyy")
              : "present")}
        </CardDescription>
        <CardAction>{data?.job_title}</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  )
}

export default WorkCard
