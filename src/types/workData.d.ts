export interface createWorkDataDto {
  company_name: string
  job_title: string
  startDate: Date
  finishDate: Date
  responsibilities: string[]
}

export interface updatedWorkData {
  company_name: string
  job_title: string
  startDate: Date
  finishDate: Date
  responsibilities: string[]
}
export interface updateWorkDataDto {
  id: string
  updatedData: updatedWorkData
}
