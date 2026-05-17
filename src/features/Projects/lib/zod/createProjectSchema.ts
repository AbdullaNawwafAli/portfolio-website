import z from "zod"

export const projectTagSchema = z
  .string()
  .trim()
  .min(1, "Tag is required")
  .max(100, "Tag must be 100 characters or less")

export const projectMediaDraftSchema = z.object({
  file: z
    .instanceof(File, { message: "Media file is required" })
    .refine((file) => file.size > 0, { message: "Media file is required" }),
  type: z.enum(["img", "vid"]),
  description: z.string().min(1, "Description is required"),
  alt: z
    .string()
    .min(1, "Alt text is required")
    .max(50, "Alt text must be 50 characters or less"),
})

export const projectMediaItemSchema = projectMediaDraftSchema.extend({
  order: z.number().min(0),
})

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
  media: z
    .array(projectMediaItemSchema)
    .min(1, "At least one media item is required"),
  tags: z.array(projectTagSchema).min(1, "At least one tag is required"),
})
