import { Button } from "@/ui/shadcn/button"
import { FieldGroup } from "@/ui/shadcn/field"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/shadcn/sheet"
import { SquarePen } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { changeResumePdfSchema } from "../lib/zod/changeResumePdfSchema"
import { useAppForm } from "@/features/TanstackForm/hooks"
import { toast } from "sonner"
import { convertToBase64 } from "@/lib/utils/fileUtils"
import { OverWriteFileToCloudinaryApi } from "@/lib/api-calls/cloudinary"
import { OverWriteFileToCloudinaryApiType } from "@/types/cloudinaryData"

interface ChangeResumePDFSheetProps {
  resume_pdf_cloudinary_id: string
}

const ChangeResumePDFSheet = ({
  resume_pdf_cloudinary_id,
}: ChangeResumePDFSheetProps) => {
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      resume_pdf_cloudinary_id,
      base64File,
    }: OverWriteFileToCloudinaryApiType) =>
      OverWriteFileToCloudinaryApi({
        resume_pdf_cloudinary_id,
        base64File,
      }),
    onSuccess: () => {
      toast("Hero Set up Successfully")

      if (preview) URL.revokeObjectURL(preview)
      setPreview(null)
    },
  })

  const form = useAppForm({
    defaultValues: {
      resume_pdf: undefined as File | undefined,
    },
    validators: {
      onChange: changeResumePdfSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      if (value.resume_pdf) {
        const heroPicBase64 = await convertToBase64(value.resume_pdf)
        await mutate({ resume_pdf_cloudinary_id, base64File: heroPicBase64 })
      }
    },
  })
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet>
        <form
          id="change-resume-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="capitalize font-sans hover:bg-transparent"
            >
              Edit <SquarePen />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={"right"}
            className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
          >
            <SheetHeader>
              <SheetTitle>Change Hero Photo</SheetTitle>
            </SheetHeader>
            <div className="no-scrollbar overflow-y-auto p-4">
              <FieldGroup>
                {preview && (
                  <Image
                    src={preview}
                    alt="Hero photo preview"
                    width={400}
                    height={400}
                  />
                )}

                <form.AppField name="resume_pdf">
                  {(field) => <field.FileInput label="Hero Photo" />}
                </form.AppField>
              </FieldGroup>
            </div>
            <SheetFooter>
              <div className="flex justify-between gap-2">
                <div className="w-full">
                  <Button
                    variant="outline"
                    form="change-resume-form"
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>

              <SheetClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (preview) URL.revokeObjectURL(preview)
                    setPreview(null)
                  }}
                >
                  Cancel
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </form>
      </Sheet>
    </div>
  )
}

export default ChangeResumePDFSheet
