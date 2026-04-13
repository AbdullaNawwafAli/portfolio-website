import { useAppForm } from "@/features/TanstackForm/hooks"
import { WorkData } from "@/types/workData"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/card"
import { createWorkSchema } from "../lib/zod/createWorkSchema"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/ui/shadcn/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/ui/shadcn/input-group"
import { XIcon } from "lucide-react"
import { Button } from "@/ui/shadcn/button"

interface WorkCardProps {
  data?: WorkData
  formMode?: boolean
}
const WorkCard = ({ data, formMode }: WorkCardProps) => {
  const form = useAppForm({
    defaultValues: {
      company_name: "",
      job_title: "",
      startDate: new Date(),
      finishDate: new Date(),
      responsibilities: [] as string[],
    },
    validators: {
      onChange: createWorkSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("value", value)
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
              <div className="flex gap-2">
                <form.AppField name="startDate">
                  {(field) => <field.DatePicker label="Start Date" />}
                </form.AppField>
                <form.AppField name="finishDate">
                  {(field) => <field.DatePicker label="Finish Date" />}
                </form.AppField>
              </div>
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
                        {field.state.value.map((_, index) => (
                          <form.AppField
                            key={index}
                            name={`responsibilities[${index}]`}
                          >
                            {(innerField) => {
                              const isInvalid =
                                innerField.state.meta.isTouched &&
                                !innerField.state.meta.isValid
                              return (
                                <Field
                                  orientation="horizontal"
                                  data-invalid={isInvalid}
                                >
                                  <FieldContent>
                                    <InputGroup>
                                      <InputGroupInput
                                        id={innerField.name}
                                        aria-invalid={isInvalid}
                                        aria-label={`User ${index + 1} email`}
                                        type="email"
                                        onBlur={innerField.handleBlur}
                                        onChange={(e) =>
                                          innerField.handleChange(
                                            e.target.value
                                          )
                                        }
                                        value={innerField.state.value}
                                      />
                                      {field.state.value.length > 1 && (
                                        <InputGroupAddon align="inline-end">
                                          <InputGroupButton
                                            type="button"
                                            variant="ghost"
                                            size="icon-xs"
                                            onClick={() =>
                                              field.removeValue(index)
                                            }
                                            aria-label={`Remove User ${index + 1}`}
                                          >
                                            <XIcon />
                                          </InputGroupButton>
                                        </InputGroupAddon>
                                      )}
                                    </InputGroup>
                                    {isInvalid && (
                                      <FieldError
                                        errors={innerField.state.meta.errors}
                                      />
                                    )}
                                  </FieldContent>
                                </Field>
                              )
                            }}
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
        <CardDescription>{data?.job_title}</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  )
}

export default WorkCard
