import { useAppForm } from "@/features/TanstackForm/hooks/hooks"
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
import { FieldGroup } from "@/ui/shadcn/field"
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
} from "../../../../services/education"
import { createEducationSchema } from "../../lib/zod/createEducationSchema"

interface EducationCardProps {
  data?: EducationData
  formMode?: boolean
  isAddingNewEntry?: (addNewEntry: boolean) => void
  setIsFormSubmitting?: (isFormSubmitting: boolean) => void
  deleteAllowed?: boolean
}
const EducationCard = ({
  data,
  formMode,
  deleteAllowed,
  isAddingNewEntry,
  setIsFormSubmitting,
}: EducationCardProps) => {
  const queryClient = useQueryClient()
  const { mutate: createEducationRecord } = useMutation({
    mutationFn: (value: createEducationDataDto) => createEducationApi(value),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["education"] })
      setIsFormSubmitting?.(false)
      isAddingNewEntry?.(false)
      toast("Education entry created successfully")
    },
  })

  const { mutate: deleteEducationRecord } = useMutation({
    mutationFn: (id: string | undefined) =>
      deleteEducationApi({ id: id } as deleteEducationDataDto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["education"] })
      toast("Education entry deleted successfully")
    },
    onError: () => {
      toast.error("Failed to delete education entry")
    },
  })

  const form = useAppForm({
    defaultValues: {
      institute: "",
      study: "",
      country: "",
      startDate: undefined as Date | undefined,
      finishDate: undefined as Date | undefined,
    },
    validators: {
      onSubmit: createEducationSchema,
    },
    onSubmit: async ({ value }) => {
      setIsFormSubmitting?.(true)
      await createEducationRecord(value as createEducationDataDto)
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
              <form.AppField name="study">
                {(field) => <field.Input label="Course Name / Study" />}
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
        <CardTitle> {data?.study}</CardTitle>
        <CardDescription>{data?.institute}</CardDescription>
        <CardAction>
          {(data?.startDate
            ? format(new Date(data.startDate), "MMM yyyy")
            : undefined) +
            " - " +
            (data?.finishDate
              ? format(new Date(data?.finishDate), "MMM yyyy")
              : "present")}{" "}
        </CardAction>
      </CardHeader>
      <CardContent></CardContent>
      {deleteAllowed ? (
        <CardFooter>
          <div className="flex items-center justify-center w-full">
            <Button
              variant="destructive"
              onClick={() => deleteEducationRecord(data?.id)}
            >
              <Trash />
            </Button>
          </div>
        </CardFooter>
      ) : null}
    </Card>
  )
}

export default EducationCard
