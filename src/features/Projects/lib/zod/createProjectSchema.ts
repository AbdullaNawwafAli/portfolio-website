import z from "zod"

export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1024, "Description must be 1024 characters or less"),
  startDate: z
    .union([z.date(), z.undefined()])
    .refine((v) => v !== undefined, { message: "Start date is required" }),
  finishDate: z
    .union([z.date(), z.undefined()])
    .refine((v) => v !== undefined, { message: "Finish date is required" }),
  order: z.number().min(0, "Order must be 0 or greater"),
  featured: z.boolean(),
  media: z.array(
    z.object({
      file: z.instanceof(File, { message: "Media file is required" }),
      type: z.enum(["img", "vid"]),
      description: z.string().min(1, "Description is required"),
      alt: z
        .string()
        .min(1, "Alt text is required")
        .max(50, "Alt text must be 50 characters or less"),
      order: z.number().min(0),
    })
  ),
  tags: z.array(z.string().min(1, "Tag cannot be empty")),
})
