export interface createWorkDataDto{
      company_name: string
  job_title: string
  startDate: Date
  finishDate: Date
  responsibilities: text(" responsibilities")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
}