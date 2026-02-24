import { ReactNode } from "react"

export interface FormControlProps {
  label: string
  description?: string
  type?: string
}

export interface FormBaseProps extends FormControlProps {
  children: ReactNode
  horizontal?: boolean
  controlFirst?: boolean
}

import React from "react"
import { useFieldContext } from "./hooks"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/ui/shadcn/field"

const FormBase = ({
  label,
  description,
  children,
  controlFirst,
  horizontal,
}: FormBaseProps) => {
  const field = useFieldContext()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  )

  const errorElement = isInvalid && (
    <FieldError errors={field.state.meta.errors} />
  )

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
    >
      {controlFirst ? (
        <>
          <>
            {children}
            <FieldContent>
              {labelElement} {errorElement}
            </FieldContent>
          </>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {errorElement}
        </>
      )}
    </Field>
  )
}

export default FormBase
