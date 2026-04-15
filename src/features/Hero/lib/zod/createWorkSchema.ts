import z from "zod"

export const createWorkSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  job_title: z.string().min(1, "Job title is required"),
  startDate: z
    .union([z.date(), z.undefined()])
    .refine((v) => v !== undefined, { message: "Start date is required" }),
  finishDate: z.union([z.date(), z.undefined()]),
  responsibilities: z.union([z.array(z.string()), z.undefined()]),
})
