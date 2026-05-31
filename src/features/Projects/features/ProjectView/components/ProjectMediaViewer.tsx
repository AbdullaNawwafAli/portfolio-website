"use client"
import createProjectByIdQueryOption from "@/features/Projects/hooks/createProjectByIdQueryOption"
import CloudinaryImage from "@/ui/CloudinaryImage"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/shadcn/carousel"
import { useQuery } from "@tanstack/react-query"

interface ProjectMediaViewerProps {
  projectId: string
}

const ProjectMediaViewer = ({ projectId }: ProjectMediaViewerProps) => {
  const { data } = useQuery(
    createProjectByIdQueryOption(
      { projectId: projectId },
      { staleTime: 1000 * 60 * 5 }
    )
  )

  const media = data?.media

  return (
    <Carousel className="w-full">
      <div className="flex items-center gap-2">
        <CarouselPrevious className="static translate-x-0" />
        <CarouselContent>
          {media?.map((mediaItem, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center h-96 "
            >
              <CloudinaryImage
                src={mediaItem.cloudinaryId}
                alt={`Media ${index + 1}`}
                width={800}
                height={600}
                className="rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  )
}

export default ProjectMediaViewer
