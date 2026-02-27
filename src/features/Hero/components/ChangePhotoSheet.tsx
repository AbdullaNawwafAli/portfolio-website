import { Button } from "@/ui/shadcn/button"
import { FieldGroup } from "@/ui/shadcn/field"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/shadcn/sheet"
import { SquarePen } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { changeHeroPhotoSchema } from "../lib/zod/changeHeroPhotoSchema"
import { useAppForm } from "@/features/TanstackForm/hooks"
import { toast } from "sonner"
import { convertToBase64 } from "@/lib/utils/fileUtils"
import {
  OverWriteFileToCloudinaryApi,
  OverWriteFileToCloudinaryApiType,
} from "@/lib/api-calls/cloudinary"

interface ChangeHeroPhotoSheetProps {
  bio_picture_cloudinary_id: string
}

const ChangePhotoSheet = ({
  bio_picture_cloudinary_id,
}: ChangeHeroPhotoSheetProps) => {
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      bio_picture_cloudinary_id,
      base64File,
    }: OverWriteFileToCloudinaryApiType) =>
      OverWriteFileToCloudinaryApi({
        bio_picture_cloudinary_id,
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
      hero_photo: undefined as File | undefined,
    },
    validators: {
      onChange: changeHeroPhotoSchema,
    },
    onSubmit: async ({ value }) => {
      if (value.hero_photo) {
        const heroPicBase64 = await convertToBase64(value.hero_photo)
        await mutate({ bio_picture_cloudinary_id, base64File: heroPicBase64 })
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

                <form.AppField
                  name="hero_photo"
                  validators={{
                    onChange: ({ value }) => {
                      if (value) {
                        if (preview) URL.revokeObjectURL(preview)
                        const objectUrl = URL.createObjectURL(value)
                        setPreview(objectUrl)
                      } else {
                        if (preview) URL.revokeObjectURL(preview)
                        setPreview(null)
                      }
                    },
                  }}
                >
                  {(field) => <field.FileInput label="Hero Photo" />}
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
                    disabled={true}
                  >
                    {isPending ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>

              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </form>
      </Sheet>
    </div>
  )
}

export default ChangePhotoSheet
