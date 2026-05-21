import React from "react"

interface PageHeaderTypographyProps {
  children: React.ReactNode
}
const PageHeaderTypography = ({ children }: PageHeaderTypographyProps) => {
  return (
    <span className="font-heading text-3xl font-semibold text-primary">
      {children}
    </span>
  )
}

export default PageHeaderTypography
