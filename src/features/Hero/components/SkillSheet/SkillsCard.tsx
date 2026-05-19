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
import { Trash } from "lucide-react"
import { createSkillsSchema } from "../../lib/zod/createSkillsSchema"
import {
  createSkillsDataDto,
  deleteSkillsDataDto,
  Skill,
  SkillsData,
} from "@/types/skills"
import { createSkillsApi, deleteSkillsApi } from "@/lib/api-calls/skills"
import { convertToBase64 } from "@/lib/utils/fileUtils"
import { uploadFileToCloudinaryApi } from "@/lib/api-calls/cloudinary"
import { CldImage } from "next-cloudinary"

interface SkillsCardProps {
  data?: SkillsData
  formMode?: boolean
  isAddingNewEntry?: (addNewEntry: boolean) => void
  setIsFormSubmitting?: (isFormSubmitting: boolean) => void
  deleteAllowed?: boolean
}
const SkillsCard = ({
  data,
  formMode,
  deleteAllowed,
  isAddingNewEntry,
  setIsFormSubmitting,
}: SkillsCardProps) => {
  const queryClient = useQueryClient()
  const { mutate: createSkillRecord } = useMutation({
    mutationFn: (value: createSkillsDataDto) => createSkillsApi(value),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["skills"] })
      setIsFormSubmitting?.(false)
      isAddingNewEntry?.(false)
      toast("Skill entry created successfully")
    },
  })

  const { mutate: deleteSkillRecord } = useMutation({
    mutationFn: (id: string | undefined) =>
      deleteSkillsApi({ id: id } as deleteSkillsDataDto),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] })
      toast("Skills entry deleted successfully")
    },
    onError: () => {
      toast.error("Failed to delete Skills entry")
    },
  })

  const form = useAppForm({
    defaultValues: {
      skill_type_name: "",
      skills: [] as { skill_name: string; skill_logo: File }[],
    },
    validators: {
      onSubmit: createSkillsSchema,
    },
    onSubmit: async ({ value }) => {
      setIsFormSubmitting?.(true)
      if (value.skills) {
        const skills = await Promise.all(
          value.skills.map(async (skill) => {
            const base64 = await convertToBase64(skill.skill_logo)
            const { publicId: cloudinaryResponse } =
              await uploadFileToCloudinaryApi(base64)

            return {
              skill_name: skill.skill_name,
              skill_logo_cloudinary_id: cloudinaryResponse,
            }
          })
        )

        await createSkillRecord({
          skill_type_name: value.skill_type_name,
          skills,
        } as createSkillsDataDto)
      }
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
                            skill_logo: new File([], ""),
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
                          <form.AppField name={`skills[${index}].skill_logo`}>
                            {(innerField) => (
                              <innerField.FileInput label="Skill Logo" />
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
        <CardTitle>{data?.skill_type_name}</CardTitle>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent>
        {data?.skill_info.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2">
            <CldImage
              src={skill.skill_logo_cloudinary_id as string}
              alt="Skill Logo"
              width={25}
              height={25}
            />
            <div className="font-sans text-md">{skill.skill_name}</div>
          </div>
        ))}
      </CardContent>
      {deleteAllowed ? (
        <CardFooter>
          <div className="flex items-center justify-center w-full">
            <Button
              variant="destructive"
              onClick={() => deleteSkillRecord(data?.id)}
            >
              <Trash />
            </Button>
          </div>
        </CardFooter>
      ) : null}
    </Card>
  )
}

export default SkillsCard
