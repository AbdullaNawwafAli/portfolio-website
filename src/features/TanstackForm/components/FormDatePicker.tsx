"use client"

import * as React from "react"
import { useFieldContext } from "../hooks"
import FormBase, { FormControlProps } from "../FormBase"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/shadcn/popover"
import { Button } from "@/ui/shadcn/button"
import { Calendar } from "@/ui/shadcn/calendar"

const FormDatePicker = (props: FormControlProps) => {
  const field = useFieldContext<Date | undefined>()
  const [open, setOpen] = React.useState(false)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            id={field.name}
            className="w-full justify-start font-normal"
            onBlur={field.handleBlur}
            aria-invalid={isInvalid}
          >
            {field.state.value
              ? field.state.value.toLocaleDateString()
              : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={field.state.value}
            defaultMonth={field.state.value}
            captionLayout="dropdown"
            onSelect={(date) => {
              field.handleChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </FormBase>
  )
}

export default FormDatePicker
