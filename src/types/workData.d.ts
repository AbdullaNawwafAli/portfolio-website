export interface WorkData {
  id: string
  company_name: string
  job_title: string
  country: string
  city: string
  startDate: Date
  finishDate?: Date
  responsibilities: string[]
}
export interface createWorkDataDto {
  company_name: string
  job_title: string
  country: string
  city: string
  startDate: Date
  finishDate?: Date
  responsibilities?: string[]
}

export interface updatedWorkData {
  company_name: string
  job_title: string
  country: string
  city: string
  startDate: Date
  finishDate: Date
  responsibilities: string[]
}
export interface updateWorkDataDto {
  id: string
  updatedData: updatedWorkData
}

export interface deleteWorkDataDto {
  id: string
}
