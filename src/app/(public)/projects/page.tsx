import PageLayoutWrapper from "@/ui/wrappers/PageLayoutWrapper"

const ProjectsPage = () => {
  return (
    <PageLayoutWrapper>
      <div className="h-full w-full flex gap-2 items-center justify-start py-10">
        <span className="font-heading text-3xl font-semibold text-primary">
          My Projects
        </span>
      </div>
    </PageLayoutWrapper>
  )
}

export default ProjectsPage
