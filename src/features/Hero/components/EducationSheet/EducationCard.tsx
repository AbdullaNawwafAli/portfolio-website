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
import {
  createEducationDataDto,
  deleteEducationDataDto,
  EducationData,
} from "@/types/educationData"
import {
  createEducationApi,
  deleteEducationApi,
} from "@/lib/api-calls/education"
import { createEducationSchema } from "../../lib/zod/createEducationSchema"

interface EducationCardProps {
  data?: EducationData
  formMode?: boolean
  deleteAllowed?: boolean
  onSaved?: () => void
}
const EducationCard = ({
  data,
  formMode,
  deleteAllowed,
  onSaved,
}: EducationCardProps) => {
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
        queryClient.invalidateQueries({ queryKey: ["education"] })
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
      onSubmit: createEducationSchema,
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
          id="education-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <CardContent>
            <FieldGroup>
              <form.AppField name="institute">
                {(field) => <field.Input label="Institute" />}
              </form.AppField>
              <form.AppField name="country">
                {(field) => <field.Input label="Country" />}
              </form.AppField>
              <form.AppField name="startDate">
                {(field) => <field.DatePicker label="Start Date" />}
              </form.AppField>
              <form.AppField name="finishDate">
                {(field) => <field.DatePicker label="Finish Date" />}
              </form.AppField>
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

export default EducationCard
