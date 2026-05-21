import { ProjectData } from "@/features/Projects/types/projectData"
import CloudinaryImage from "@/ui/CloudinaryImage"
import { Button } from "@/ui/shadcn/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/ui/shadcn/card"
import Link from "next/link"

interface ProjectCardProps {
  data: ProjectData
}

const ProjectCard = ({ data }: ProjectCardProps) => {
  return (
    <Card className="w-full bg-transparent border-0 gap-0 shadow-none group">
      <CardHeader className="flex justify-between px-1 py-0">
        <CardTitle className="font-sans font-semibold text-md text-center items-end">
          0
        </CardTitle>
        <CardTitle className="font-sans font-semibold text-md text-center">
          {data.name}
        </CardTitle>
      </CardHeader>
      <div className="rounded-t-sm overflow-hidden aspect-4/3 w-full">
        <CloudinaryImage
          alt={data?.media?.[0].alt as string}
          src={data?.media?.[0].cloudinaryId as string}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-10">
        <CardFooter className="flex overflow-hidden rounded-b-sm h-full max-h-0 bg-primary group-hover:max-h-16 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out justify-between items-center px-1 py-0">
          <span className="font-sans text-background">21 April 2025</span>
          <Link href={`/admin-projects/${data.id}`}>
            <Button
              variant={"ghost"}
              className="px-0 font-sans hover:bg-transparent hover:text-background text-background"
            >
              View
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  )
}

export default ProjectCard
