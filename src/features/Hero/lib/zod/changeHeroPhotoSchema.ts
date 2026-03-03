import z from "zod"

export const changeResumePdfSchema = z.object({
  resume_pdf: z.instanceof(File, {
    message: "resume PDF is required",
  }),
})
