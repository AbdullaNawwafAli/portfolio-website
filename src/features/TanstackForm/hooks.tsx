import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import FormInput from "./components/FormInput"
import FormInputGroupTextArea from "./components/FormInputGroupTextArea"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    InputGroupTextArea: FormInputGroupTextArea,
  },
  formComponents: {},
  fieldContext,
  formContext,
})

export { useAppForm, useFieldContext, useFormContext }
