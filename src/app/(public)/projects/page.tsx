import { NewProjectSheet } from "@/features/Projects/components/NewProjectSheet"

const Projects = () => {
  return (
    <div className="h-full w-full flex-1">
      <div className="h-full w-full flex gap-2 items-center justify-start py-10">
        <span className="font-heading text-3xl font-semibold text-primary">
          My Projects
        </span>
        <NewProjectSheet />
      </div>
    </div>
  )
}

export default Projects
