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
import { FieldGroup } from "@/ui/shadcn/field"

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
