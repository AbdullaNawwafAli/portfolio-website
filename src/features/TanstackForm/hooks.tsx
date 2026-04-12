import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import FormInput from "./components/FormInput"
import FormInputGroupTextArea from "./components/FormInputGroupTextArea"
import FormFileInput from "./components/FormFileInput"
import FormDatePicker from "./components/FormDatePicker"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    InputGroupTextArea: FormInputGroupTextArea,
    FileInput: FormFileInput,
    DatePicker: FormDatePicker,
  },
  formComponents: {},
  fieldContext,
  formContext,
})

export { useAppForm, useFieldContext, useFormContext }
