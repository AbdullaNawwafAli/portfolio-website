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

interface WorkCardProps {
  data?: WorkData
  formMode?: boolean
}
const WorkCard = ({ data, formMode }: WorkCardProps) => {
  const form = useAppForm({
    defaultValues: {},
    validators: {
      onChange: createWorkSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("value", value)
    },
  })

  if (form) {
    return (
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>{data?.job_title}</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Form Content</p>
        </CardContent>
        <CardFooter>Form Footer</CardFooter>
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
