import { cn } from "@/utils/shadcn"

interface PageLayoutWrapperProps {
  children: React.ReactNode
  className?: string
}

const PageLayoutWrapper = ({
  children,
  className = "",
}: PageLayoutWrapperProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 flex-1 h-full py-10 w-full",
        className
      )}
    >
      {children}
    </div>
  )
}

export default PageLayoutWrapper
