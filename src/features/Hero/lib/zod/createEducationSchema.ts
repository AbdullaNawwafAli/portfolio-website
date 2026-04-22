import z from "zod"

export const createEducationSchema = z.object({
  institute: z.string().min(1, "Institute is required"),
  country: z.string().min(1, "Country is required"),
  startDate: z
    .union([z.date(), z.undefined()])
    .refine((v) => v !== undefined, { message: "Start date is required" }),
  finishDate: z
    .union([z.date(), z.undefined()])
    .refine((v) => v !== undefined, { message: "Finish date is required" }),
})
