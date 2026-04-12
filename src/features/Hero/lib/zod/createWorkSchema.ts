import z from "zod"

export const createWorkSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  job_title: z.string().min(1, "Job title is required"),
  startDate: z.date(),
  finishDate: z.date(),
  responsibilities: z.array(z.string()).optional(),
})
