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

interface WorkCardProps {
  data: WorkData
}
const WorkCard = ({ data }: WorkCardProps) => {
  console.log(data, "work card data")
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.company_name}</CardTitle>
        <CardDescription>{data.job_title}</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export default WorkCard
