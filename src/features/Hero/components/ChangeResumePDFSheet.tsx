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
import { ArrowDownToLine, SquarePen } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { changeResumePdfSchema } from "../lib/zod/changeHeroPhotoSchema"
import { useAppForm } from "@/features/TanstackForm/hooks"
import { toast } from "sonner"
import { convertToBase64 } from "@/lib/utils/fileUtils"
import { OverWriteFileToCloudinaryApi } from "@/lib/api-calls/cloudinary"
import { OverWriteFileToCloudinaryApiType } from "@/types/cloudinaryData"
import CloudinaryImage from "@/ui/CloudinaryImage"

interface ChangeResumePDFSheetProps {
  resume_pdf_cloudinary_id: string
  onUploadSuccess?: () => void
}

const ChangeResumePDFSheet = ({
  resume_pdf_cloudinary_id,
  onUploadSuccess,
}: ChangeResumePDFSheetProps) => {
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  })

  //   const { mutate, isPending } = useMutation({
  //     mutationFn: ({
  //       bio_picture_cloudinary_id,
  //       base64File,
  //     }: OverWriteFileToCloudinaryApiType) =>
  //       OverWriteFileToCloudinaryApi({
  //         bio_picture_cloudinary_id,
  //         base64File,
  //       }),
  //     onSuccess: () => {
  //       toast("Hero Set up Successfully")

  //       if (preview) URL.revokeObjectURL(preview)
  //       setPreview(null)
  //       onUploadSuccess()
  //     },
  //   })

  const form = useAppForm({
    defaultValues: {
      resume_pdf: undefined as File | undefined,
    },
    validators: {
      onChange: changeResumePdfSchema,
    },
    onSubmit: async ({ value }) => {
      if (value.resume_pdf) {
        const heroPicBase64 = await convertToBase64(value.resume_pdf)
        // await mutate({ resume_pdf_cloudinary_id, base64File: heroPicBase64 })
      }
    },
  })
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet>
        <form
          id="hero-photo-form"
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
              Resume <ArrowDownToLine />
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
                <Image
                  src={resume_pdf_cloudinary_id}
                  alt="test"
                  width={400}
                  height={400}
                />
                {preview && (
                  <Image
                    src={preview}
                    alt="Hero photo preview"
                    width={400}
                    height={400}
                  />
                )}

                <form.AppField name="resume_pdf">
                  {(field) => <field.FileInput label="Resume PDF" />}
                </form.AppField>
              </FieldGroup>
            </div>
            <SheetFooter>
              <div className="flex justify-between gap-2">
                <div className="w-full">
                  <Button
                    variant="outline"
                    type="submit"
                    form="hero-photo-form"
                    className="w-full"
                    disabled={false /*isPending*/}
                  >
                    {false /*isPending*/ ? "Submitting..." : "Submit"}
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
