import React from "react"
import { useFieldContext } from "../hooks"
import FormBase, { FormControlProps } from "../FormBase"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/ui/shadcn/input-group"

const FormInputGroupTextArea = (props: FormControlProps) => {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  return (
    <FormBase {...props}>
      <InputGroup>
        <InputGroupTextarea
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder="Description"
          rows={6}
          className="min-h-24 resize-none"
          aria-invalid={isInvalid}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="tabular-nums">
            {field.state.value.length}/200 characters
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </FormBase>
  )
}

export default FormInputGroupTextArea
